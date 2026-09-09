-- Tabel untuk menyimpan data formulir brief & konsultasi proyek (Leads / Inquiries)
create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  company text,
  contact text not null,
  divisions text[] default '{}',
  target_date text,
  budget text,
  notes text not null,
  channel text default 'whatsapp',
  status text default 'new',
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.inquiries enable row level security;

-- 1. Izinkan publik/pengunjung untuk submit/insert brief baru
drop policy if exists "public_insert_inquiries" on public.inquiries;
create policy "public_insert_inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (true);

-- 2. Izinkan admin & superadmin untuk melihat/membaca seluruh daftar brief
drop policy if exists "admins_select_inquiries" on public.inquiries;
create policy "admins_select_inquiries"
on public.inquiries
for select
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('admin', 'superadmin')
  )
);

-- 3. Izinkan admin & superadmin untuk update status (misal: 'in_progress', 'completed', 'archive')
drop policy if exists "admins_update_inquiries" on public.inquiries;
create policy "admins_update_inquiries"
on public.inquiries
for update
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('admin', 'superadmin')
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('admin', 'superadmin')
  )
);
