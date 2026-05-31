-- Pakai satu tabel saja untuk role admin: public.profiles

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'pending',
  created_at timestamptz default now()
);

alter table public.profiles
drop constraint if exists profiles_role_check;

alter table public.profiles
add constraint profiles_role_check
check (role in ('pending', 'admin', 'superadmin'));

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'superadmin')
  );
$$;

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

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    coalesce(new.email, ''),
    'pending'
  )
  on conflict (id) do update
  set
    email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated"
on public.profiles
for select
to authenticated
using (auth.uid() = id or public.is_superadmin());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (public.is_superadmin());

drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_update_superadmin" on public.profiles;
create policy "profiles_update_superadmin"
on public.profiles
for update
to authenticated
using (public.is_superadmin())
with check (public.is_superadmin());

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

-- Public content tables ------------------------------------------------------
-- These tables are read by the public website. Only authenticated admins can
-- write where needed, and only superadmin can edit site text/scope/settings.

alter table if exists public.content enable row level security;

drop policy if exists "content_select_public" on public.content;
create policy "content_select_public"
on public.content
for select
to anon, authenticated
using (true);

drop policy if exists "content_write_superadmin" on public.content;
create policy "content_write_superadmin"
on public.content
for all
to authenticated
using (public.is_superadmin())
with check (public.is_superadmin());

alter table if exists public.scope_services enable row level security;

drop policy if exists "scope_services_select_public" on public.scope_services;
create policy "scope_services_select_public"
on public.scope_services
for select
to anon, authenticated
using (true);

drop policy if exists "scope_services_write_superadmin" on public.scope_services;
create policy "scope_services_write_superadmin"
on public.scope_services
for all
to authenticated
using (public.is_superadmin())
with check (public.is_superadmin());

alter table if exists public.works enable row level security;

drop policy if exists "works_select_public" on public.works;
create policy "works_select_public"
on public.works
for select
to anon, authenticated
using (true);

drop policy if exists "works_insert_authenticated" on public.works;
create policy "works_insert_authenticated"
on public.works
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "works_update_authenticated" on public.works;
create policy "works_update_authenticated"
on public.works
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "works_delete_authenticated" on public.works;
create policy "works_delete_authenticated"
on public.works
for delete
to authenticated
using (public.is_admin());

alter table if exists public.activities enable row level security;

drop policy if exists "activities_insert_authenticated" on public.activities;
create policy "activities_insert_authenticated"
on public.activities
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "activities_select_superadmin" on public.activities;
create policy "activities_select_superadmin"
on public.activities
for select
to authenticated
using (public.is_superadmin());

drop policy if exists "activities_delete_superadmin" on public.activities;
create policy "activities_delete_superadmin"
on public.activities
for delete
to authenticated
using (public.is_superadmin());

-- Storage policies -----------------------------------------------------------
-- Bucket photos is public for website images. Authenticated admins may upload
-- and replace works images. Deleting storage files is reserved for superadmin.

insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do update
set public = true;

drop policy if exists "photos_select_public" on storage.objects;
create policy "photos_select_public"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'photos');

drop policy if exists "photos_insert_authenticated" on storage.objects;
create policy "photos_insert_authenticated"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'photos'
  and public.is_admin()
  and (storage.foldername(name))[1] = 'works'
);

drop policy if exists "photos_update_authenticated" on storage.objects;
create policy "photos_update_authenticated"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'photos'
  and public.is_admin()
  and (storage.foldername(name))[1] = 'works'
)
with check (
  bucket_id = 'photos'
  and public.is_admin()
  and (storage.foldername(name))[1] = 'works'
);

drop policy if exists "photos_delete_superadmin" on storage.objects;
create policy "photos_delete_superadmin"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'photos'
  and public.is_superadmin()
);

-- Ganti email ini dengan email akun Supabase Auth kamu.
insert into public.profiles (id, email, role)
select id, email, 'superadmin'
from auth.users
where email = 'q.idfxzz@gmail.com'
on conflict (id) do update
set
  email = excluded.email,
  role = 'superadmin';

-- Isi profile untuk user Auth lama yang belum punya row profiles.
insert into public.profiles (id, email, role)
select
  id,
  email,
  'pending'
from auth.users
where email is not null
on conflict (id) do nothing;

-- Opsional, kalau tabel lama sudah tidak dipakai.
-- drop table if exists public.admin_profiles;
-- drop table if exists public.admins;
