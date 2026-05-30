-- Pakai satu tabel saja untuk role admin: public.profiles

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'admin',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create or replace function public.is_superadmin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'superadmin'
  );
$$;

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
with check (auth.uid() = id or public.is_superadmin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id or public.is_superadmin())
with check (auth.uid() = id or public.is_superadmin());

drop policy if exists "profiles_delete_superadmin" on public.profiles;
create policy "profiles_delete_superadmin"
on public.profiles
for delete
to authenticated
using (public.is_superadmin());

create table if not exists public.site_settings (
  key text primary key,
  value text default '',
  updated_at timestamptz default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_select_all" on public.site_settings;
create policy "site_settings_select_all"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "site_settings_write_superadmin" on public.site_settings;
create policy "site_settings_write_superadmin"
on public.site_settings
for all
to authenticated
using (public.is_superadmin())
with check (public.is_superadmin());

insert into public.site_settings (key, value)
values
  ('site_name', 'WD Group'),
  ('default_language', 'id'),
  ('contact_email', ''),
  ('whatsapp_url', ''),
  ('instagram_url', ''),
  ('admin_panel_name', 'WD Admin'),
  ('maintenance_mode', 'false'),
  ('show_public_website', 'true')
on conflict (key) do nothing;

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
