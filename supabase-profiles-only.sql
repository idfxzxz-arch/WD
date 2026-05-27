-- Pakai satu tabel saja untuk role admin: public.profiles

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'admin',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated"
on public.profiles
for select
to authenticated
using (true);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Ganti email ini dengan email akun Supabase Auth kamu.
insert into public.profiles (id, email, role)
select id, email, 'superadmin'
from auth.users
where email = 'q.idfxzz@gmail.com'
on conflict (id) do update
set
  email = excluded.email,
  role = 'superadmin';

-- Opsional, kalau tabel lama sudah tidak dipakai.
-- drop table if exists public.admin_profiles;
-- drop table if exists public.admins;
