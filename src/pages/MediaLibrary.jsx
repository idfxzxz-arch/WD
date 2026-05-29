import { useEffect, useMemo, useState } from "react";
import {
  Copy,
  Download,
  HardDriveUpload,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
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
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2400);
  };

  const fetchFiles = async () => {
    setLoading(true);
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

  const filteredFiles = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return files;
    return files.filter((file) => file.name.toLowerCase().includes(term));
  }, [files, query]);

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
      showToast("Media berhasil diupload");
    } catch (error) {
      alert("Gagal upload media: " + error.message);
    } finally {
      event.target.value = "";
      setUploading(false);
    }
  };

  const copyUrl = async (url) => {
    await navigator.clipboard.writeText(url);
    showToast("URL media disalin");
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
    showToast("Media dihapus");
  };

  return (
    <div className="max-w-6xl mx-auto">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white text-sm px-5 py-3 rounded-2xl shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Media Library
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Kelola file di bucket Supabase <code>photos/{FOLDER}</code>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={fetchFiles}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 px-4 py-2.5 rounded-xl text-sm transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>

          <label className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <HardDriveUpload className="w-4 h-4" />}
            Upload Media
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={uploadFiles}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-2xl p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama file..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition"
          />
        </div>
      </div>

      {loading ? (
        <div className="h-64 bg-[#111111] border border-white/5 rounded-2xl flex items-center justify-center text-zinc-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading media...
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="h-64 bg-[#111111] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-zinc-500">
          <ImageIcon className="w-10 h-10 mb-3" />
          Belum ada media yang cocok.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFiles.map((file) => (
            <div
              key={file.path}
              className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden group"
            >
              <div className="aspect-[4/3] bg-zinc-900 overflow-hidden">
                <img
                  src={file.publicUrl}
                  alt={file.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <h2 className="text-sm font-semibold text-white truncate" title={file.name}>
                  {file.name}
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  {formatSize(file.metadata?.size)} · {formatDate(file.created_at)}
                </p>

                <div className="grid grid-cols-3 gap-2 mt-4">
                  <button
                    onClick={() => copyUrl(file.publicUrl)}
                    className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2 py-2 text-xs text-zinc-300 transition"
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
                    className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg px-2 py-2 text-xs text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
