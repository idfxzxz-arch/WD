import { useEffect, useState, useCallback } from "react";
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
  Trash2,
  Menu,
  X,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [adminEmail, setAdminEmail] = useState("");
  const [adminId, setAdminId] = useState("");
  const [role, setRole] = useState("admin");

  const [totalAdmins, setTotalAdmins] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isSuperAdmin = role === "superadmin";
  const isAdminBiasa = role === "admin";

  const getAdminProfile = useCallback(async (user) => {
    const byId = await supabase
      .from("profiles")
      .select("id,email,role")
      .eq("id", user.id)
      .maybeSingle();

    if (!byId.error && byId.data) return byId.data;

    if (user.email) {
      const byEmail = await supabase
        .from("profiles")
        .select("id,email,role")
        .eq("email", user.email)
        .maybeSingle();

      if (!byEmail.error && byEmail.data) return byEmail.data;
    }

    return null;
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        await supabase.auth.signOut();
        navigate("/admin/login", { replace: true });
        return;
      }

      const profile = await getAdminProfile(user);
      const email = profile?.email || user.email || "";
      const id = profile?.id || user.id;
      const adminRole =
        profile?.role ||
        user.app_metadata?.role ||
        user.user_metadata?.role ||
        "admin";

      setAdminEmail(email);
      setAdminId(id);
      setRole(adminRole);

      const sessionKey = `logged_${id}`;

      if (!sessionStorage.getItem(sessionKey)) {
        await supabase.from("activities").insert([
          {
            admin_email: email || "System",
            action_name: "Logged In",
            target_name: "Admin Dashboard",
          },
        ]);

        sessionStorage.setItem(sessionKey, "true");
      }
    } catch (error) {
      console.error(error);
      await supabase.auth.signOut();
      navigate("/admin/login", { replace: true });
    }
  }, [getAdminProfile, navigate]);

  const fetchAdminCount = useCallback(async () => {
    try {
      setLoadingStats(true);

      const { count, error } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });

      if (error) throw error;

      setTotalAdmins(typeof count === "number" ? count : 0);
    } catch (error) {
      console.error(error);
      setTotalAdmins(adminId ? 1 : 0);
    } finally {
      setLoadingStats(false);
    }
  }, [adminId]);

  const fetchActivities = useCallback(async () => {
    try {
      setLoadingActivities(true);

      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;

      setActivities(data || []);
    } catch (error) {
      console.error(error);
      setActivities([]);
    } finally {
      setLoadingActivities(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    fetchAdminCount();
  }, [fetchAdminCount, location.pathname]);

  useEffect(() => {
    fetchActivities();

    const interval = setInterval(() => {
      fetchActivities();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchActivities]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleDeleteActivity = async (id, targetName) => {
    if (!isSuperAdmin) {
      alert("Akses ditolak! Hanya Superadmin yang dapat menghapus log.");
      return;
    }

    const konfirmasi = window.confirm(`Hapus log aktivitas "${targetName}"?`);
    if (!konfirmasi) return;

    try {
      const { error } = await supabase.from("activities").delete().eq("id", id);
      if (error) throw error;

      fetchActivities();
    } catch (error) {
      alert("Gagal menghapus log: " + error.message);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  const navItemClass = (path) => `
    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium
    ${
      isActive(path)
        ? "bg-white/10 text-white shadow-sm"
        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
    }
  `;

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-zinc-200 font-sans selection:bg-indigo-500/30 relative overflow-x-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 w-[260px] bg-[#0f0f0f] border-r border-white/5 flex flex-col z-50 transition-transform duration-300
          md:relative md:transform-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
              <Command className="text-white w-4 h-4" />
            </div>
            <span className="text-base font-semibold tracking-wide text-white">
              Workspace
            </span>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 text-zinc-400 hover:text-white md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">
            Overview
          </p>

          <nav className="space-y-1 mb-8">
            <Link to="/admin/dashboard" className={navItemClass("/admin/dashboard")}>
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>

            <Link to="/admin/content" className={navItemClass("/admin/content")}>
              <FileText className="w-4 h-4" /> Content
            </Link>

            <Link to="/admin/media" className={navItemClass("/admin/media")}>
              <ImageIcon className="w-4 h-4" /> Media Library
            </Link>
          </nav>

          <p className="px-3 text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">
            System
          </p>

          <nav className="space-y-1">
            <Link to="/admin/team" className={navItemClass("/admin/team")}>
              <Users className="w-4 h-4" /> Team Members
            </Link>

            <Link to="/admin/settings" className={navItemClass("/admin/settings")}>
              <Settings className="w-4 h-4" /> Settings
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10 flex items-center justify-center text-xs font-bold text-white uppercase shrink-0">
              {adminEmail ? adminEmail.substring(0, 2) : "AD"}
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-sm font-medium text-white truncate">
                  Account
                </p>

                {isSuperAdmin && (
                  <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30 font-bold uppercase">
                    Superadmin
                  </span>
                )}

                {isAdminBiasa && (
                  <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-white/5 font-bold uppercase">
                    Admin
                  </span>
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
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg bg-white/5 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-indigo-500 rounded-full border border-[#0a0a0a]" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
          {location.pathname === "/admin/dashboard" && (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
              <div className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Overview
                </h1>
                <p className="text-xs md:text-sm text-zinc-500 mt-1">
                  Monitor your website metrics and recent updates in real-time.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8">
                <div className="bg-[#111111] border border-white/5 rounded-xl p-5 shadow-sm">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 w-fit mb-4">
                    <FolderDot className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white">
                    12
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 mt-1">
                    Total Active Projects
                  </p>
                </div>

                <div className="bg-[#111111] border border-white/5 rounded-xl p-5 shadow-sm">
                  <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400 w-fit mb-4">
                    <HardDriveUpload className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white">
                    84
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 mt-1">
                    Media Files Uploaded
                  </p>
                </div>

                <div className="bg-[#111111] border border-white/5 rounded-xl p-5 shadow-sm sm:col-span-2 md:col-span-1">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 w-fit mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white">
                    {loadingStats ? "..." : totalAdmins}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 mt-1">
                    Registered Admins
                  </p>
                </div>
              </div>

              <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden shadow-sm">
                <div className="px-4 md:px-6 py-4 border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-400" />
                    <h2 className="text-sm md:text-base font-semibold text-white">
                      Recent Activity Log
                    </h2>
                  </div>

                  <span className="text-[10px] md:text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded-md">
                    Live
                  </span>
                </div>

                <div className="overflow-x-auto w-full current-scrollbar">
                  <table className="w-full text-xs md:text-sm text-left min-w-[600px] md:min-w-full">
                    <thead className="text-[11px] md:text-xs text-zinc-500 bg-white/[0.02] border-b border-white/5">
                      <tr>
                        <th className="px-4 md:px-6 py-3 font-medium">
                          Target Context
                        </th>
                        <th className="px-6 py-3 font-medium">Action</th>
                        <th className="px-6 py-3 font-medium">Time / Date</th>
                        <th className="px-6 py-3 font-medium">Executor</th>
                        {isSuperAdmin && (
                          <th className="px-4 md:px-6 py-3 font-medium text-right">
                            Options
                          </th>
                        )}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-white/5">
                      {loadingActivities ? (
                        <tr>
                          <td
                            colSpan={isSuperAdmin ? "5" : "4"}
                            className="px-6 py-10 text-center text-zinc-500"
                          >
                            Loading logs...
                          </td>
                        </tr>
                      ) : activities.length > 0 ? (
                        activities.map((activity) => (
                          <tr
                            key={activity.id}
                            className="hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="px-4 md:px-6 py-4 font-medium text-white flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                              <span className="truncate max-w-[150px] md:max-w-none">
                                {activity.target_name}
                              </span>
                            </td>

                            <td className="px-6 py-4">
                              <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 text-[11px] rounded border border-white/5 whitespace-nowrap">
                                {activity.action_name}
                              </span>
                            </td>

                            <td className="px-6 py-4 text-zinc-400 text-[11px] whitespace-nowrap">
                              {activity.created_at
                                ? (() => {
                                    const activityDate = new Date(
                                      activity.created_at
                                    );
                                    const today = new Date();

                                    if (
                                      activityDate.toDateString() ===
                                      today.toDateString()
                                    ) {
                                      return activityDate.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      });
                                    }

                                    return activityDate.toLocaleDateString([], {
                                      day: "numeric",
                                      month: "short",
                                    });
                                  })()
                                : "—"}
                            </td>

                            <td className="px-6 py-4 text-[11px] text-zinc-500 font-mono">
                              {activity.admin_email
                                ? activity.admin_email.split("@")[0]
                                : "System"}
                            </td>

                            {isSuperAdmin && (
                              <td className="px-4 md:px-6 py-4 text-right">
                                <button
                                  onClick={() =>
                                    handleDeleteActivity(
                                      activity.id,
                                      activity.target_name
                                    )
                                  }
                                  className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={isSuperAdmin ? "5" : "4"}
                            className="px-6 py-10 text-center text-zinc-500"
                          >
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
