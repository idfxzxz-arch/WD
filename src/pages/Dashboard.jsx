import { useEffect, useState } from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  LogOut,
  FolderDot,
  HardDriveUpload,
  Command,
  Search,
  Bell,
  Activity,
  Trash2 
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State manajemen data
  const [adminEmail, setAdminEmail] = useState("");
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);

  // ─── KONDISI ROLE MANAGEMENT (AMAN & TERVALIDASI) ──────────────────────────
  const SUPER_ADMIN_EMAIL = "idfxzxz@gmail.com";
  
  const isSuperAdmin = adminEmail.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
  const isAdminBiasa = adminEmail.toLowerCase() === "admin@admin";
  // ────────────────────────────────────────────────────────────────────────────

  // 1. Ambil data sesi admin yang sedang login & catat aktivitas login
  useEffect(() => {
    const getProfileAndLog = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAdminEmail(user.email);
        
        // Log aktivitas login secara otomatis jika belum tercatat di sesi ini
        const sessionKey = `logged_${user.id}`;
        if (!sessionStorage.getItem(sessionKey)) {
          await supabase.from('activities').insert([
            { 
              admin_email: user.email, 
              action_name: 'Logged In', 
              target_name: 'Admin Panel Session' 
            }
          ]);
          sessionStorage.setItem(sessionKey, 'true');
        }
      }
    };
    getProfileAndLog();
  }, []);

  // 2. Ambil Jumlah Total Admin Terdaftar (Menggunakan RPC)
  useEffect(() => {
    const fetchAdminCount = async () => {
      const { data, error } = await supabase.rpc('get_total_users');
      if (!error) {
        setTotalAdmins(data || 0);
      } else {
        // Fallback statis jika RPC tidak memberikan data akses langsung
        setTotalAdmins(2); 
      }
      setLoadingStats(false);
    };

    fetchAdminCount();
  }, [location.pathname]);

  // Fungsi fetchActivities ditarik ke luar lingkup useEffect agar bisa dipanggil kembali setelah proses hapus data
  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5); // Batasi hanya 5 tindakan terbaru

    if (!error) setActivities(data || []);
    setLoadingActivities(false);
  };

  // 3. Setup Realtime Listener
  useEffect(() => {
    fetchActivities();

    // Dengarkan perubahan database tabel aktivitas secara real-time
    const activitySubscription = supabase
      .channel('realtime-dashboard-activities')
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'activities' }, 
        () => {
          fetchActivities();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(activitySubscription);
    };
  }, []);

  // 4. Fungsi Hapus Aktivitas (Garda Keamanan Frontend)
  const handleDeleteActivity = async (id, targetName) => {
    if (!isSuperAdmin) {
      alert("Akses ditolak! Hanya Akun Superadmin (idfxzxz@gmail.com) yang dapat menghapus log.");
      return;
    }

    const konfirmasi = window.confirm(`Hapus log aktivitas "${targetName}"?`);
    if (!konfirmasi) return;

    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Gagal menghapus log: " + error.message);
    } else {
      fetchActivities(); // Refresh data setelah berhasil dihapus
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  const navItemClass = (path) => `
    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium
    ${isActive(path) 
      ? "bg-white/10 text-white shadow-sm" 
      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"}
  `;

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-zinc-200 font-sans selection:bg-indigo-500/30">
      
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-[#0f0f0f] border-r border-white/5 flex flex-col">
        
        {/* Logo Area */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/5">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Command className="text-white w-4 h-4" />
          </div>
          <span className="text-base font-semibold tracking-wide text-white">
            Workspace
          </span>
        </div>

        {/* Navigation Menu */}
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">
            Overview
          </p>
          <nav className="space-y-1 mb-8">
            <Link to="/admin/dashboard" className={navItemClass("/admin/dashboard")}>
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link to="/admin/content" className={navItemClass("/admin/content")}>
              <FileText className="w-4 h-4" />
              Content
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-all duration-200 text-sm font-medium">
              <ImageIcon className="w-4 h-4" />
              Media Library
            </button>
          </nav>

          <p className="px-3 text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">
            System
          </p>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-all duration-200 text-sm font-medium">
              <Users className="w-4 h-4" />
              Team Members
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-all duration-200 text-sm font-medium">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </nav>
        </div>

        {/* User Profile Footer (Dengan Penanda Role Visual) */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10 flex items-center justify-center text-xs font-bold text-white uppercase">
              {adminEmail ? adminEmail.substring(0, 2) : "AD"}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-sm font-medium text-white truncate">Account</p>
                {isSuperAdmin && (
                  <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30 font-bold tracking-wider uppercase">Superadmin</span>
                )}
                {isAdminBiasa && (
                  <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-white/5 font-bold tracking-wider uppercase">Admin</span>
                )}
              </div>
              <p className="text-xs text-zinc-500 truncate">
                {adminEmail || "Loading profile..."}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

      </aside>

      {/* MAIN LAYOUT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-indigo-500 rounded-full border border-[#0a0a0a]"></span>
            </button>
          </div>
        </header>

        {/* MAIN ROUTE CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto">
          
          {location.pathname === "/admin/dashboard" && (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
              
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight">Overview</h1>
                <p className="text-sm text-zinc-500 mt-1">Monitor your website metrics and recent updates in real-time.</p>
              </div>

              {/* STAT CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div className="bg-[#111111] border border-white/5 rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                      <FolderDot className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold text-white">12</h3>
                    <p className="text-sm text-zinc-500 mt-1">Total Active Projects</p>
                  </div>
                </div>

                <div className="bg-[#111111] border border-white/5 rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400">
                      <HardDriveUpload className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold text-white">84</h3>
                    <p className="text-sm text-zinc-500 mt-1">Media Files Uploaded</p>
                  </div>
                </div>

                <div className="bg-[#111111] border border-white/5 rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold text-white">
                      {loadingStats ? "..." : totalAdmins}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">Registered Admins</p>
                  </div>
                </div>
              </div>

              {/* REAL-TIME RECENT ACTIVITY SECTION */}
              <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-400 animate-pulse" />
                    <h2 className="text-base font-semibold text-white">Recent Activity Log</h2>
                  </div>
                  <span className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded-md">Live Update</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-zinc-500 bg-white/[0.02] border-b border-white/5">
                      <tr>
                        <th className="px-6 py-3 font-medium">Target Context</th>
                        <th className="px-6 py-3 font-medium">Action</th>
                        <th className="px-6 py-3 font-medium">Time / Date</th>
                        <th className="px-6 py-3 font-medium">Executor</th>
                        {/* Menampilkan kolom header Options hanya untuk Superadmin */}
                        {isSuperAdmin && <th className="px-6 py-3 font-medium text-right">Options</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {loadingActivities ? (
                        <tr>
                          <td colSpan={isSuperAdmin ? "5" : "4"} className="px-6 py-10 text-center text-zinc-500">
                            Loading logs...
                          </td>
                        </tr>
                      ) : activities.length > 0 ? (
                        activities.map((activity) => (
                          <tr key={activity.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                              {activity.target_name}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 text-xs rounded border border-white/5">
                                {activity.action_name}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-zinc-400 text-xs">
                              {activity.created_at ? (() => {
                                const activityDate = new Date(activity.created_at);
                                const today = new Date();
                                
                                if (activityDate.toDateString() === today.toDateString()) {
                                  return activityDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                }
                                return activityDate.toLocaleDateString([], { day: 'numeric', month: 'short' });
                              })() : "—"}
                            </td>
                            <td className="px-6 py-4 text-xs text-zinc-500 font-mono">
                              {activity.admin_email ? activity.admin_email.split('@')[0] : 'System'}
                            </td>
                            {/* PROTEKSI UI: Tombol sampah hanya akan dirender jika isSuperAdmin bernilai TRUE */}
                            {isSuperAdmin && (
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => handleDeleteActivity(activity.id, activity.target_name)}
                                  className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition duration-150"
                                  title="Delete log"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={isSuperAdmin ? "5" : "4"} className="px-6 py-10 text-center text-zinc-500">
                            No activities recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          <Outlet />

        </main>
      </div>
    </div>
  );
}