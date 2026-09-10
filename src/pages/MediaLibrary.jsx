import { useEffect, useMemo, useState } from "react";
import {
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
  const [toast, setToast] = useState("");
  const [role, setRole] = useState("admin");
  const isSuperAdmin = role === "superadmin";

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
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
      alert("Gagal memuat media: " + error.message);
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
      // Unselect all currently filtered
      setSelectedPaths((prev) =>
        prev.filter((path) => !filteredFiles.some((f) => f.path === path))
      );
    } else {
      // Select all currently filtered
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
      showToast("✓ Media berhasil diunggah");
    } catch (error) {
      alert("Gagal upload media: " + error.message);
    } finally {
      event.target.value = "";
      setUploading(false);
    }
  };

  const copyUrl = async (url) => {
    await navigator.clipboard.writeText(url);
    showToast("✓ URL media disalin ke clipboard");
  };

  const deleteFile = async (file) => {
    const confirmed = window.confirm(`Hapus media "${file.name}"?`);
    if (!confirmed) return;

    const { error } = await supabase.storage.from(BUCKET).remove([file.path]);
    if (error) {
      alert("Gagal menghapus media: " + error.message);
      return;
    }

    setFiles((current) => current.filter((item) => item.path !== file.path));
    setSelectedPaths((current) => current.filter((p) => p !== file.path));
    showToast("✓ Media berhasil dihapus");
  };

  const deleteSelectedFiles = async () => {
    if (!selectedPaths.length) return;

    const count = selectedPaths.length;
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus ${count} media terpilih sekaligus dari storage? Tindakan ini permanen.`
    );
    if (!confirmed) return;

    setDeletingBulk(true);
    try {
      const { error } = await supabase.storage.from(BUCKET).remove(selectedPaths);
      if (error) throw error;

      // Hapus juga referensi di tabel works jika ada
      try {
        const deletedUrls = files
          .filter((f) => selectedPaths.includes(f.path))
          .map((f) => f.publicUrl);

        if (deletedUrls.length > 0) {
          await supabase.from("works").delete().in("image", deletedUrls);
        }
      } catch (dbErr) {
        console.warn("Works sync warning:", dbErr);
      }

      setFiles((current) => current.filter((item) => !selectedPaths.includes(item.path)));
      setSelectedPaths([]);
      showToast(`✓ Berhasil menghapus ${count} media`);
    } catch (error) {
      alert("Gagal menghapus media: " + error.message);
    } finally {
      setDeletingBulk(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white font-medium text-sm px-5 py-3 rounded-2xl shadow-xl animate-fade-in">
          {toast}
        </div>
      )}

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
              onClick={deleteSelectedFiles}
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

      {/* Floating Selection Banner on mobile/desktop when items selected */}
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
              className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded-lg transition"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={deleteSelectedFiles}
              disabled={deletingBulk}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-md shadow-red-600/20"
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
                      onClick={() => deleteFile(file)}
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
