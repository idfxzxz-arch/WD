import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Edit3,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Mail,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserRoundCog,
  UsersRound,
  X,
} from "lucide-react"
import { supabase } from "../lib/supabase"

const initialForm = {
  email: "",
  password: "",
  role: "admin",
}

const withTimeout = (promise, message = "Request terlalu lama. Coba refresh lalu ulangi.") => {
  let timeoutId

  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), 15000)
  })

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId))
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function TeamMembers() {
  const [members, setMembers] = useState([])
  const [currentUserId, setCurrentUserId] = useState("")
  const [currentEmail, setCurrentEmail] = useState("")
  const [currentRole, setCurrentRole] = useState("admin")
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [creating, setCreating] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [searchQuery, setSearchQuery] = useState("")
  const [toast, setToast] = useState({ message: "", type: "success" })

  // Modal State for Edit Member
  const [editModal, setEditModal] = useState({
    isOpen: false,
    member: null,
    email: "",
    role: "admin",
    newPassword: "",
    showNewPassword: false,
    isSaving: false,
    isSendingReset: false,
  })

  // Modal State for Delete Confirmation
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    member: null,
    isDeleting: false,
  })

  const isSuperAdmin = currentRole === "superadmin"

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: "", type: "success" }), 3000)
  }

  const fetchMembers = async () => {
    setLoading(true)

    try {
      const { data: { user } } = await withTimeout(supabase.auth.getUser())
      if (user) {
        setCurrentUserId(user.id)
        if (user.email) setCurrentEmail(user.email)
      }

      const { data: profile } = await withTimeout(
        supabase
          .from("profiles")
          .select("id,email,role")
          .eq("id", user?.id)
          .maybeSingle()
      )

      setCurrentRole(profile?.role || "admin")

      const { data, error } = await withTimeout(
        supabase
          .from("profiles")
          .select("id,email,role,created_at")
          .order("created_at", { ascending: false })
      )

      if (error) throw error
      setMembers(data || [])
    } catch (error) {
      showToast("Gagal memuat team members: " + error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return members
    return members.filter(
      (m) =>
        m.email?.toLowerCase().includes(q) ||
        m.role?.toLowerCase().includes(q)
    )
  }, [members, searchQuery])

  const updateRole = async (member, role) => {
    if (!isSuperAdmin) {
      showToast("Hanya superadmin yang bisa mengubah role.", "error")
      return
    }

    setSavingId(member.id)
    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", member.id)

    if (error) {
      showToast("Gagal mengubah role: " + error.message, "error")
    } else {
      await supabase.from("activities").insert([
        {
          admin_email: currentEmail || "System",
          action_name: "Updated Role",
          target_name: `${member.email} menjadi ${role}`,
        },
      ])
      showToast(`✓ Role ${member.email} diubah menjadi ${role}`, "success")
      await fetchMembers()
    }

    setSavingId(null)
  }

  const addMember = async (event) => {
    event.preventDefault()

    if (!isSuperAdmin) {
      showToast("Hanya superadmin yang bisa menambah user.", "error")
      return
    }

    const email = form.email.trim().toLowerCase()
    const password = form.password.trim()

    if (!email || !password) {
      showToast("Email dan password wajib diisi.", "error")
      return
    }

    if (password.length < 6) {
      showToast("Password minimal 6 karakter.", "error")
      return
    }

    setCreating(true)

    const {
      data: { session: adminSession },
    } = await supabase.auth.getSession()

    try {
      const { data, error } = await withTimeout(
        supabase.auth.signUp({
          email,
          password,
        }),
        "Signup terlalu lama. Pastikan Email signups aktif di Supabase, lalu coba lagi."
      )

      if (error) throw error

      if (data.user?.identities && data.user.identities.length === 0) {
        throw new Error("Email ini sudah terdaftar di Supabase Auth.")
      }

      if (adminSession?.access_token && adminSession?.refresh_token) {
        await withTimeout(
          supabase.auth.setSession({
            access_token: adminSession.access_token,
            refresh_token: adminSession.refresh_token,
          })
        )
      }

      const newUserId = data.user?.id
      if (!newUserId) {
        throw new Error("User berhasil diminta dibuat, tetapi ID user tidak tersedia.")
      }

      const { error: profileError } = await withTimeout(
        supabase
          .from("profiles")
          .upsert(
            {
              id: newUserId,
              email,
              role: form.role,
            },
            { onConflict: "id" }
          ),
        "User Auth berhasil dibuat, tetapi profile role terlalu lama disimpan. Cek policy profiles di Supabase."
      )

      if (profileError) {
        await wait(1200)

        const { data: existingProfile, error: checkError } = await withTimeout(
          supabase
            .from("profiles")
            .select("id")
            .eq("id", newUserId)
            .maybeSingle(),
          "User Auth berhasil dibuat, tetapi profile belum terbaca. Jalankan ulang SQL trigger profiles di Supabase."
        )

        if (checkError || !existingProfile) {
          throw profileError
        }
      }

      await withTimeout(
        supabase.from("activities").insert([
          {
            admin_email: currentEmail || "System",
            action_name: "Added Team Member",
            target_name: `${email} sebagai ${form.role}`,
          },
        ])
      )

      setForm(initialForm)
      await fetchMembers()
      showToast("✓ User admin baru berhasil ditambahkan.", "success")
    } catch (error) {
      showToast("Gagal menambah user: " + error.message, "error")
    } finally {
      if (adminSession?.access_token && adminSession?.refresh_token) {
        await supabase.auth.setSession({
          access_token: adminSession.access_token,
          refresh_token: adminSession.refresh_token,
        })
      }
      setCreating(false)
    }
  }

  // ─── EDIT MEMBER ─────────────────────────────────────────────────────────────
  const openEditModal = (member) => {
    if (!isSuperAdmin) {
      showToast("Hanya superadmin yang dapat mengedit akun user.", "error")
      return
    }
    setEditModal({
      isOpen: true,
      member,
      email: member.email || "",
      role: member.role || "admin",
      newPassword: "",
      showNewPassword: false,
      isSaving: false,
      isSendingReset: false,
    })
  }

  const handleSaveEdit = async (e) => {
    e?.preventDefault()
    if (!editModal.member) return

    const newEmail = editModal.email.trim().toLowerCase()
    const newRole = editModal.role

    if (!newEmail) {
      showToast("Email tidak boleh kosong.", "error")
      return
    }

    setEditModal((prev) => ({ ...prev, isSaving: true }))

    try {
      const isSelf = editModal.member.id === currentUserId || editModal.member.email === currentEmail

      // Update password if self and password entered
      if (isSelf && editModal.newPassword.trim()) {
        if (editModal.newPassword.trim().length < 6) {
          throw new Error("Password baru minimal 6 karakter.")
        }
        const { error: pwdErr } = await supabase.auth.updateUser({
          password: editModal.newPassword.trim(),
        })
        if (pwdErr) throw pwdErr
      }

      // Update profile table
      const { error: profileErr } = await supabase
        .from("profiles")
        .update({
          email: newEmail,
          role: newRole,
        })
        .eq("id", editModal.member.id)

      if (profileErr) throw profileErr

      // Log activity
      await supabase.from("activities").insert([
        {
          admin_email: currentEmail || "System",
          action_name: "Edited Team Member",
          target_name: `${newEmail} (${newRole})`,
        },
      ])

      showToast("✓ Informasi akun berhasil diperbarui.", "success")
      setEditModal((prev) => ({ ...prev, isOpen: false, isSaving: false }))
      await fetchMembers()
    } catch (error) {
      showToast("Gagal menyimpan perubahan: " + error.message, "error")
      setEditModal((prev) => ({ ...prev, isSaving: false }))
    }
  }

  const handleSendPasswordReset = async () => {
    const targetEmail = editModal.email || editModal.member?.email
    if (!targetEmail) return

    setEditModal((prev) => ({ ...prev, isSendingReset: true }))
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(targetEmail, {
        redirectTo: window.location.origin + "/wd-ops",
      })
      if (error) throw error

      showToast(`✓ Link reset password telah dikirim ke ${targetEmail}`, "success")
    } catch (error) {
      showToast("Gagal kirim link reset: " + error.message, "error")
    } finally {
      setEditModal((prev) => ({ ...prev, isSendingReset: false }))
    }
  }

  // ─── DELETE MEMBER ───────────────────────────────────────────────────────────
  const openDeleteModal = (member) => {
    if (!isSuperAdmin) {
      showToast("Hanya superadmin yang dapat menghapus akun user.", "error")
      return
    }

    const isSelf = member.id === currentUserId || member.email === currentEmail
    if (isSelf) {
      showToast("Anda tidak dapat menghapus akun yang sedang Anda gunakan saat ini.", "error")
      return
    }

    setDeleteModal({
      isOpen: true,
      member,
      isDeleting: false,
    })
  }

  const handleConfirmDelete = async () => {
    if (!deleteModal.member) return

    const memberToDelete = deleteModal.member
    setDeleteModal((prev) => ({ ...prev, isDeleting: true }))

    try {
      // 1. Delete from profiles table
      const { error: profileErr } = await supabase
        .from("profiles")
        .delete()
        .eq("id", memberToDelete.id)

      if (profileErr) throw profileErr

      // 2. Log activity
      await supabase.from("activities").insert([
        {
          admin_email: currentEmail || "System",
          action_name: "Deleted Team Member",
          target_name: `${memberToDelete.email} (${memberToDelete.role || "admin"})`,
        },
      ])

      // 3. Update local state
      setMembers((current) => current.filter((m) => m.id !== memberToDelete.id))
      setDeleteModal({ isOpen: false, member: null, isDeleting: false })
      showToast(`✓ Akun ${memberToDelete.email} berhasil dihapus.`, "success")
    } catch (error) {
      showToast("Gagal menghapus user: " + error.message, "error")
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }))
    }
  }

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

      {/* Edit User Modal */}
      <AnimatePresence>
        {editModal.isOpen && editModal.member && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => !editModal.isSaving && setEditModal((prev) => ({ ...prev, isOpen: false }))}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
              className="relative z-10 w-full max-w-lg bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/90 overflow-hidden text-left"
            >
              {/* Ambient Blue/Indigo Glow */}
              <div className="absolute -top-24 -left-20 w-56 h-56 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                disabled={editModal.isSaving}
                onClick={() => setEditModal((prev) => ({ ...prev, isOpen: false }))}
                className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition disabled:opacity-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Edit Akun Team Member
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Perbarui informasi email, role, atau akses login user.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    value={editModal.email}
                    onChange={(e) =>
                      setEditModal((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                    Role Hak Akses
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEditModal((prev) => ({ ...prev, role: "admin" }))}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        editModal.role === "admin"
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                          : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <UserRoundCog className="w-4 h-4" />
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditModal((prev) => ({ ...prev, role: "superadmin" }))}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        editModal.role === "superadmin"
                          ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30"
                          : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Superadmin
                    </button>
                  </div>
                </div>

                {/* Password / Reset Options */}
                <div className="border-t border-white/5 pt-4 space-y-3">
                  {editModal.member.id === currentUserId ? (
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                        Ganti Password Anda (Opsional)
                      </label>
                      <div className="relative">
                        <input
                          type={editModal.showNewPassword ? "text" : "password"}
                          value={editModal.newPassword}
                          onChange={(e) =>
                            setEditModal((prev) => ({ ...prev, newPassword: e.target.value }))
                          }
                          placeholder="Kosongkan jika tidak ingin mengubah password"
                          className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-3.5 py-2.5 pr-10 text-sm text-white outline-none transition focus:border-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setEditModal((prev) => ({
                              ...prev,
                              showNewPassword: !prev.showNewPassword,
                            }))
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white"
                        >
                          {editModal.showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                        <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <p className="font-semibold text-white">Reset Password Akun</p>
                          <p className="text-[11px] text-zinc-400">
                            Kirimkan link reset password ke email user
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleSendPasswordReset}
                        disabled={editModal.isSendingReset}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-white/10 transition cursor-pointer disabled:opacity-50"
                      >
                        {editModal.isSendingReset ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Mail className="w-3.5 h-3.5" />
                        )}
                        Kirim Link
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    disabled={editModal.isSaving}
                    onClick={() => setEditModal((prev) => ({ ...prev, isOpen: false }))}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 font-medium text-sm transition cursor-pointer disabled:opacity-50 text-center"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={editModal.isSaving}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {editModal.isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Simpan Perubahan</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.isOpen && deleteModal.member && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => !deleteModal.isDeleting && setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
              className="relative z-10 w-full max-w-md bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/90 overflow-hidden text-left"
            >
              <div className="absolute -top-24 -left-20 w-56 h-56 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

              <button
                type="button"
                disabled={deleteModal.isDeleting}
                onClick={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
                className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition disabled:opacity-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0 shadow-lg shadow-red-500/10">
                  <Trash2 className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Hapus Akun User?
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md mt-1 border border-red-500/20">
                    Tindakan Permanen
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 my-4">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Apakah Anda yakin ingin menghapus akun user ini dari sistem admin panel?
                </p>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold uppercase text-white shrink-0">
                    {(deleteModal.member.email || "US").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">
                      {deleteModal.member.email}
                    </p>
                    <p className="text-[11px] text-zinc-400 capitalize">
                      Role: {deleteModal.member.role || "admin"}
                    </p>
                  </div>
                </div>

                <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-300">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Peringatan</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-normal pl-6">
                    User yang dihapus tidak akan bisa lagi login ke dashboard admin.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-2">
                <button
                  type="button"
                  disabled={deleteModal.isDeleting}
                  onClick={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 font-medium text-sm transition cursor-pointer disabled:opacity-50 text-center"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={deleteModal.isDeleting}
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {deleteModal.isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menghapus...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Hapus User</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <UsersRound className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Team Members
            </h1>
            <p className="text-xs md:text-sm text-zinc-400">
              Kelola akun admin, role akses dashboard, edit atau hapus akun pengguna.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
            Total: <span className="text-white font-bold">{members.length} User</span>
          </div>
        </div>
      </div>

      {!isSuperAdmin && (
        <div className="mb-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200 flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Mode lihat saja. Penambahan, pengeditan, dan penghapusan akun hanya dapat dilakukan oleh Superadmin.</span>
        </div>
      )}

      {/* Tambah User Admin Form */}
      {isSuperAdmin && (
        <form
          onSubmit={addMember}
          className="mb-6 rounded-2xl border border-white/5 bg-[#111111] p-4 md:p-5"
        >
          <div className="mb-4 flex items-center gap-2.5">
            <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-2 text-indigo-400">
              <Plus className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Tambah User Admin Baru</h2>
              <p className="text-xs text-zinc-400">
                Buat akun login baru dan tentukan role aksesnya.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_160px_auto] md:items-end">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="admin@email.com"
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  placeholder="Minimal 6 karakter"
                  className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3.5 py-2.5 pr-10 text-sm text-white outline-none transition focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-zinc-500 transition hover:bg-white/5 hover:text-white"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Role
              </label>
              <select
                value={form.role}
                onChange={(event) =>
                  setForm((current) => ({ ...current, role: event.target.value }))
                }
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={creating}
              className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Tambah
            </button>
          </div>
        </form>
      )}

      {/* Filter / Search Bar */}
      <div className="mb-4 relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari user berdasarkan email atau role..."
          className="w-full bg-[#111111] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition placeholder:text-zinc-600"
        />
      </div>

      {/* Members List */}
      <div className="grid gap-3.5">
        {loading ? (
          <div className="rounded-2xl border border-white/5 bg-[#111111] p-8 text-center text-sm text-zinc-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Memuat daftar team members...
          </div>
        ) : filteredMembers.length > 0 ? (
          filteredMembers.map((member) => {
            const isSelf = member.id === currentUserId || member.email === currentEmail

            return (
              <div
                key={member.id}
                className="rounded-2xl border border-white/5 bg-[#111111] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-white/10 transition"
              >
                {/* User Info */}
                <div className="min-w-0 flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold uppercase text-white shrink-0 shadow-inner">
                    {(member.email || "AD").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-white truncate">
                        {member.email}
                      </p>
                      {isSelf && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-md">
                          <UserCheck className="w-3 h-3" /> Anda
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                      {member.role === "superadmin" ? (
                        <span className="inline-flex items-center gap-1 text-red-400 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" /> Superadmin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-zinc-400 font-medium">
                          <UserRoundCog className="w-3.5 h-3.5" /> Admin
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
                  {/* Quick Role Toggle */}
                  <div className="flex rounded-xl bg-white/5 border border-white/5 p-1 gap-1">
                    {["admin", "superadmin"].map((roleOption) => (
                      <button
                        key={roleOption}
                        onClick={() => updateRole(member, roleOption)}
                        disabled={!isSuperAdmin || savingId === member.id || member.role === roleOption}
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          member.role === roleOption
                            ? "bg-white text-black shadow-sm"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {savingId === member.id ? "..." : roleOption}
                      </button>
                    ))}
                  </div>

                  {/* Edit Button */}
                  {isSuperAdmin && (
                    <button
                      type="button"
                      onClick={() => openEditModal(member)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-semibold transition cursor-pointer"
                      title="Edit Akun"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
                      Edit
                    </button>
                  )}

                  {/* Delete Button */}
                  {isSuperAdmin && (
                    <button
                      type="button"
                      onClick={() => openDeleteModal(member)}
                      disabled={isSelf}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20 text-xs font-semibold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-500/10 disabled:hover:text-red-400"
                      title={isSelf ? "Tidak dapat menghapus akun sendiri" : "Hapus Akun"}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            )
          })
        ) : (
          <div className="rounded-2xl border border-white/5 bg-[#111111] p-8 text-center text-sm text-zinc-500">
            {searchQuery
              ? "Tidak ada user yang cocok dengan pencarian."
              : "Belum ada member terdaftar di tabel profiles."}
          </div>
        )}
      </div>
    </div>
  )
}
