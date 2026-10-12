# PANDUAN PRAKTIS PENGGUNAAN GOOGLE BUSINESS PROFILE (GBP)
**PT WD Group Company**

Dokumen ini menjelaskan di mana dan bagaimana cara menggunakan seluruh materi GBP yang telah disiapkan.

---

## 1. DI MANA GBP DITARUH? (PENJELASAN UTAMA)

**Google Business Profile (GBP) BUKAN ditaruh di dalam kodingan website.**
GBP adalah profil bisnis yang tampil di **Google Maps** dan hasil pencarian **Google Search** (kotak panel profil bisnis di sebelah kanan layar).

Hubungannya ada dua arah:
1. **Di Google (Dashboard GBP):** Anda memasukkan alamat, nomor telepon, link website, postingan, foto, dan produk.
2. **Di Website:** Website hanya menyimpan **Link Ulasan Google** (tombol "Beri Ulasan di Google Maps" di halaman `/wedding`).

---

## 2. BAGAIMANA CARA MENGELOLANYA? (LANGKAH DEMI LANGKAH)

### Langkah 1: Membuka Dashboard GBP Anda
1. Buka browser (Chrome) dan login ke akun Gmail yang mengelola bisnis WD Group.
2. Di kolom pencarian Google, ketik kata kunci: **`Bisnis saya`** (atau buka [business.google.com](https://business.google.com)).
3. Akan muncul panel pengelolaan profil bisnis Anda secara langsung di Google.

---

### Langkah 2: Memasukkan Materi yang Sudah Disiapkan

#### A. Mengubah Kategori Bisnis
1. Di panel dashboard, klik tombol **"Edit profil"** -> **"Kategori bisnis"**.
2. **Kategori Utama:** Pilih `Perencana pernikahan` (jangan ketik Wedding Organizer karena Google memetakannya ke Perencana pernikahan).
3. **Kategori Tambahan:** Tambahkan `Penyelenggara acara` (untuk Event), `Penyedia perlengkapan audio visual` (untuk Production), dan `Grup musik` (untuk Music).
4. Klik **Simpan**.

#### B. Menaruh Link Ulasan ke Website (Satu-satunya Kodingan yang Diisi)
1. Di panel dashboard, cari tombol/menu bertuliskan **"Minta ulasan"** (Ask for reviews).
2. Akan muncul link pendek Google, contohnya: `https://g.page/r/CbXx.../review`.
3. Salin (copy) link tersebut.
4. Buka file website Anda: [`src/data/business-data.js`](../src/data/business-data.js) dan [`src/pages/wedding.jsx`](../src/pages/wedding.jsx).
5. Ganti variabel link ulasan dengan link resmi tersebut. Selesai!

#### C. Memasukkan Katalog Produk (Harga Paket Wedding)
1. Di panel dashboard, klik tombol **"Edit produk"** -> **"Tambahkan produk"**.
2. **Nama Produk:** `Package 1 (Wedding Organizer Hari-H)`
3. **Kategori:** Paket Pernikahan
4. **Harga:** `5.500.000`
5. **Deskripsi:** Salin teks deskripsi Package 1 dari materi Tahap F.
6. **Tombol:** Pilih "Pesan" atau "Pelajari lebih lanjut" dan masukkan URL: `https://www.wdgroupcompany.biz.id/wedding`.
7. Ulangi untuk **Package 2** (Rp 6.300.000) dan **Package 3** (Rp 7.300.000).

#### D. Menerbitkan Postingan Rutin (12 Postingan)
1. Di dashboard, klik menu **"Tambahkan pembaruan"** (Add update).
2. Salin teks dari **Postingan 1** (dari materi Tahap F).
3. Unggah 1 foto pendukung dari dokumentasi acara Anda.
4. Tambahkan tombol tautan ke `https://www.wdgroupcompany.biz.id/wedding`.
5. Klik **Posting**.
*(Jadwalkan 1-2 postingan setiap minggunya menggunakan materi Postingan 1 s/d 12).*

#### E. Mengisi Tanya Jawab (Q&A)
1. Buka profil bisnis Anda di Google Search.
2. Cari seksi **"Pertanyaan & Jawaban"** (Questions & Answers).
3. Klik **"Ajukan pertanyaan"** -> Salin pertanyaan dari materi Tahap F (misal: *"Berapa estimasi biaya jasa wedding organizer WD Sky Wedding di Solo Raya?"*).
4. Kirim pertanyaan tersebut, lalu langsung jawab pertanyaan itu menggunakan akun resmi bisnis Anda dengan jawaban yang sudah disediakan.
*(Fitur ini sangat bagus untuk SEO lokal karena menjawab keraguan calon klien).*

#### F. Mengirim Template Ulasan ke Klien
1. Ketika acara selesai (baik wedding maupun corporate event), buka template pesan ulasan dari materi Tahap F (pilih nada Formal, Akrab, atau Singkat).
2. Tempelkan link ulasan resmi Google Anda di bagian `[LINK_ULASAN]`.
3. Kirim ke WhatsApp klien Anda.
4. Ketika klien memberikan ulasan, segera balas menggunakan **Template Balasan Ulasan** di dashboard Google Maps.
