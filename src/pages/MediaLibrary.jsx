import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  CheckSquare,
  Copy,
  Download,
  HardDriveUpload,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Search,
  Square,
  Trash2,
  X,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const BUCKET = "photos";
const FOLDER = "works";

function formatSize(size) {
  if (!size) return "0 KB";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MediaLibrary() {
  const [files, setFiles] = useState([]);
  const [selectedPaths, setSelectedPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingBulk, setDeletingBulk] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [role, setRole] = useState("admin");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    type: "bulk", // "single" | "bulk"
    file: null,
    count: 0,
    paths: [],
  });

  const isSuperAdmin = role === "superadmin";

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  const fetchFiles = async () => {
    setLoading(true);
    setSelectedPaths([]);
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(FOLDER, {
        limit: 200,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      showToast("Gagal memuat media: " + error.message, "error");
      setLoading(false);
      return;
    }

    const mapped = (data || [])
      .filter((file) => file.name && file.name !== ".emptyFolderPlaceholder")
      .map((file) => {
        const path = `${FOLDER}/${file.name}`;
        const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(path);
        return {
          ...file,
          path,
          publicUrl: publicData.publicUrl,
        };
      });

    setFiles(mapped);
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      setRole(data?.role || "admin");
    };

    fetchRole();
  }, []);

  const filteredFiles = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return files;
    return files.filter((file) => file.name.toLowerCase().includes(term));
  }, [files, query]);

  const allFilteredSelected =
    filteredFiles.length > 0 &&
    filteredFiles.every((file) => selectedPaths.includes(file.path));

  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      setSelectedPaths((prev) =>
        prev.filter((path) => !filteredFiles.some((f) => f.path === path))
      );
    } else {
      const pathsToAdd = filteredFiles.map((file) => file.path);
      setSelectedPaths((prev) => Array.from(new Set([...prev, ...pathsToAdd])));
    }
  };

  const toggleSelectOne = (path) => {
    setSelectedPaths((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const uploadFiles = async (event) => {
    const selected = Array.from(event.target.files || []);
    if (!selected.length) return;

    setUploading(true);
    try {
      for (const file of selected) {
        const ext = file.name.split(".").pop();
        const baseName = file.name
          .replace(/\.[^/.]+$/, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        const path = `${FOLDER}/${Date.now()}-${baseName || "media"}.${ext}`;
        const { error } = await supabase.storage.from(BUCKET).upload(path, file);
        if (error) throw error;
      }

      await fetchFiles();
      showToast("✓ Media berhasil diunggah", "success");
    } catch (error) {
      showToast("Gagal upload media: " + error.message, "error");
    } finally {
      event.target.value = "";
      setUploading(false);
    }
  };

  const copyUrl = async (url) => {
    await navigator.clipboard.writeText(url);
    showToast("✓ URL media disalin ke clipboard", "success");
  };

  const openSingleDeleteModal = (file) => {
    setDeleteModal({
      isOpen: true,
      type: "single",
      file,
      count: 1,
      paths: [file.path],
    });
  };

  const openBulkDeleteModal = () => {
    if (!selectedPaths.length) return;
    setDeleteModal({
      isOpen: true,
      type: "bulk",
      file: null,
      count: selectedPaths.length,
      paths: [...selectedPaths],
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.paths.length) return;

    setDeletingBulk(true);
    try {
      const pathsToDelete = deleteModal.paths;
      const count = pathsToDelete.length;

      const { error } = await supabase.storage.from(BUCKET).remove(pathsToDelete);
      if (error) throw error;

      // Hapus juga referensi di tabel works jika ada
      try {
        const deletedUrls = files
          .filter((f) => pathsToDelete.includes(f.path))
          .map((f) => f.publicUrl);

        if (deletedUrls.length > 0) {
          await supabase.from("works").delete().in("image", deletedUrls);
        }
      } catch (dbErr) {
        console.warn("Works sync warning:", dbErr);
      }

      setFiles((current) => current.filter((item) => !pathsToDelete.includes(item.path)));
      setSelectedPaths((current) => current.filter((p) => !pathsToDelete.includes(p)));
      setDeleteModal({ isOpen: false, type: "bulk", file: null, count: 0, paths: [] });

      showToast(
        count === 1
          ? "✓ Media berhasil dihapus secara permanen"
          : `✓ Berhasil menghapus ${count} media secara permanen`,
        "success"
      );
    } catch (error) {
      showToast("Gagal menghapus media: " + error.message, "error");
    } finally {
      setDeletingBulk(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.message && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 font-medium text-sm px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              toast.type === "error"
                ? "bg-red-950/90 text-red-200 border-red-500/30 shadow-red-950/50"
                : "bg-emerald-950/90 text-emerald-200 border-emerald-500/30 shadow-emerald-950/50"
            }`}
          >
            {toast.type === "error" ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => !deletingBulk && setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
              className="relative z-10 w-full max-w-md bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/90 overflow-hidden text-left"
            >
              {/* Ambient Red Glow */}
              <div className="absolute -top-24 -left-20 w-56 h-56 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-20 w-56 h-56 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                disabled={deletingBulk}
                onClick={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
                className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition disabled:opacity-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon & Title Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0 shadow-lg shadow-red-500/10">
                  <Trash2 className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {deleteModal.type === "bulk"
                      ? `Hapus ${deleteModal.count} Foto Terpilih?`
                      : "Hapus Foto Media?"}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md mt-1 border border-red-500/20">
                    Tindakan Permanen
                  </span>
                </div>
              </div>

              {/* Body Description & Details */}
              <div className="space-y-3.5 my-4">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {deleteModal.type === "bulk" ? (
                    <>
                      Apakah Anda yakin ingin menghapus{" "}
                      <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded">
                        {deleteModal.count} media
                      </span>{" "}
                      sekaligus dari storage Supabase?
                    </>
                  ) : (
                    <>
                      Apakah Anda yakin ingin menghapus file media ini dari storage Supabase?
                    </>
                  )}
                </p>

                {/* Details Card for single item */}
                {deleteModal.type === "single" && deleteModal.file && (
                  <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-3">
                    <img
                      src={deleteModal.file.publicUrl}
                      alt={deleteModal.file.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-white truncate">
                        {deleteModal.file.name}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {formatSize(deleteModal.file.metadata?.size)} · {formatDate(deleteModal.file.created_at)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Warning note for bulk deletion */}
                {deleteModal.type === "bulk" && (
                  <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-3.5 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-300">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>Peringatan Penghapusan Massal</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-normal pl-6">
                      Seluruh file foto yang dipilih akan dihapus secara permanen dari server dan referensi di portofolio web akan otomatis dibersihkan.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6 pt-2">
                <button
                  type="button"
                  disabled={deletingBulk}
                  onClick={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 font-medium text-sm transition cursor-pointer disabled:opacity-50 text-center"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={deletingBulk}
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {deletingBulk ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menghapus...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>
                        {deleteModal.type === "bulk" ? `Hapus (${deleteModal.count})` : "Hapus Foto"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Media Library
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Kelola dan hapus foto di bucket Supabase <code className="text-zinc-300 bg-white/5 px-1.5 py-0.5 rounded">photos/{FOLDER}</code>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchFiles}
            disabled={loading || deletingBulk}
            className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 px-4 py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>

          <label className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition shadow-lg shadow-indigo-600/20">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <HardDriveUpload className="w-4 h-4" />}
            Upload Media
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={uploadFiles}
              disabled={uploading || deletingBulk}
            />
          </label>
        </div>
      </div>

      {/* Action Bar & Filter */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama file..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          {filteredFiles.length > 0 && (
            <button
              type="button"
              onClick={toggleSelectAll}
              disabled={deletingBulk}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200 cursor-pointer"
            >
              {allFilteredSelected ? (
                <CheckSquare className="w-4 h-4 text-indigo-400" />
              ) : (
                <Square className="w-4 h-4 text-zinc-400" />
              )}
              {allFilteredSelected ? "Batalkan Pilih Semua" : "Pilih Semua Foto"}
            </button>
          )}

          {selectedPaths.length > 0 && (
            <button
              type="button"
              onClick={openBulkDeleteModal}
              disabled={deletingBulk}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 cursor-pointer disabled:opacity-50"
            >
              {deletingBulk ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Hapus {selectedPaths.length} Terpilih
            </button>
          )}
        </div>
      </div>

      {/* Floating Selection Banner when items selected */}
      {selectedPaths.length > 0 && (
        <div className="bg-indigo-950/60 border border-indigo-500/30 rounded-2xl px-4 py-3 mb-6 flex items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 text-indigo-200 font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
              {selectedPaths.length}
            </span>
            <span>foto dipilih untuk dihapus</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedPaths([])}
              className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded-lg transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={openBulkDeleteModal}
              disabled={deletingBulk}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-md shadow-red-600/20 cursor-pointer"
            >
              {deletingBulk ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              Hapus Sekaligus
            </button>
          </div>
        </div>
      )}

      {/* Media Grid */}
      {loading ? (
        <div className="h-64 bg-[#111111] border border-white/5 rounded-2xl flex items-center justify-center text-zinc-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Memuat media...
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="h-64 bg-[#111111] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-zinc-500">
          <ImageIcon className="w-10 h-10 mb-3 text-zinc-600" />
          {query ? "Tidak ada media yang cocok dengan pencarian." : "Belum ada media di storage."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFiles.map((file) => {
            const isSelected = selectedPaths.includes(file.path);
            return (
              <div
                key={file.path}
                className={`bg-[#111111] border rounded-2xl overflow-hidden transition-all duration-200 group relative ${
                  isSelected
                    ? "border-indigo-500 ring-2 ring-indigo-500/50 bg-indigo-950/10 shadow-lg shadow-indigo-500/10"
                    : "border-white/5 hover:border-white/15"
                }`}
              >
                {/* Select Checkbox floating on top-left of image */}
                <button
                  type="button"
                  onClick={() => toggleSelectOne(file.path)}
                  className="absolute top-3 left-3 z-10 p-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white transition cursor-pointer shadow-md"
                  aria-label="Pilih foto"
                >
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-300" />
                  )}
                </button>

                <div
                  className="aspect-[4/3] bg-zinc-900 overflow-hidden cursor-pointer"
                  onClick={() => toggleSelectOne(file.path)}
                >
                  <img
                    src={file.publicUrl}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <h2
                    className="text-sm font-semibold text-white truncate cursor-pointer"
                    title={file.name}
                    onClick={() => toggleSelectOne(file.path)}
                  >
                    {file.name}
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    {formatSize(file.metadata?.size)} · {formatDate(file.created_at)}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <button
                      onClick={() => copyUrl(file.publicUrl)}
                      className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2 py-2 text-xs text-zinc-300 transition cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </button>
                    <a
                      href={file.publicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2 py-2 text-xs text-zinc-300 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Open
                    </a>
                    <button
                      onClick={() => openSingleDeleteModal(file)}
                      className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg px-2 py-2 text-xs text-red-400 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
