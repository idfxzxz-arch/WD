WD Company - Vercel Ready

Perubahan penting:
1. Folder node_modules dan .git sudah dibuang dari paket ini.
2. File .env asli tidak disertakan agar secret/key tidak ikut bocor.
3. Dashboard admin sudah tidak memakai endpoint Express /api/admin/*.
4. Dashboard sekarang membaca langsung dari Supabase: auth, activities, dan tabel admin/profiles jika tersedia.

Cara jalan lokal:
1. npm install
2. Salin .env.example menjadi .env
3. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY
4. npm run dev

Deploy Vercel:
1. Upload/push folder ini ke GitHub.
2. Import ke Vercel sebagai Vite project.
3. Tambahkan Environment Variables di Vercel:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. Build Command: npm run build
5. Output Directory: dist

Catatan:
Jika delete log atau baca tabel gagal, berarti RLS/policy Supabase belum mengizinkan user admin melakukan operasi tersebut. Itu bukan error React, itu Supabase sedang menjadi satpam galak.
