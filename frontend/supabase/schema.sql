create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  client_name text,
  invoice_number text not null,
  tax_rate numeric(5,2) not null default 11,
  business_name text,
  business_email text,
  business_phone text,
  business_address text,
  due_date date,
  payment_terms text,
  accent_color text not null default '#2563eb',
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  logo_data_url text,
  created_at timestamptz not null default now()
);

alter table public.invoices add column if not exists client_name text;
alter table public.invoices add column if not exists invoice_number text;
alter table public.invoices add column if not exists tax_rate numeric(5,2) not null default 11;
alter table public.invoices add column if not exists business_name text;
alter table public.invoices add column if not exists business_email text;
alter table public.invoices add column if not exists business_phone text;
alter table public.invoices add column if not exists business_address text;
alter table public.invoices add column if not exists due_date date;
alter table public.invoices add column if not exists payment_terms text;
alter table public.invoices add column if not exists accent_color text not null default '#2563eb';
alter table public.invoices add column if not exists items jsonb not null default '[]'::jsonb;
alter table public.invoices add column if not exists subtotal numeric(14,2) not null default 0;
alter table public.invoices add column if not exists total numeric(14,2) not null default 0;
alter table public.invoices add column if not exists logo_data_url text;
alter table public.invoices add column if not exists created_at timestamptz not null default now();

create index if not exists invoices_user_id_created_at_idx
  on public.invoices (user_id, created_at desc);

create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  action text not null default 'generate_invoice',
  created_at timestamptz not null default now()
);

create index if not exists usage_logs_user_id_created_at_idx
  on public.usage_logs (user_id, created_at desc);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  status text not null check (status in ('active', 'expired')),
  plan text not null default 'pro' check (plan in ('pro')),
  start_date timestamptz not null,
  end_date timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists subscriptions_user_id_status_idx
  on public.subscriptions (user_id, status);

alter table public.users enable row level security;
alter table public.invoices enable row level security;
alter table public.usage_logs enable row level security;
alter table public.subscriptions enable row level security;

drop policy if exists "users_select_own" on public.users;
drop policy if exists "users_insert_own" on public.users;
drop policy if exists "users_update_own" on public.users;
drop policy if exists "invoices_select_own" on public.invoices;
drop policy if exists "invoices_insert_own" on public.invoices;
drop policy if exists "invoices_update_own" on public.invoices;
drop policy if exists "usage_logs_select_own" on public.usage_logs;
drop policy if exists "usage_logs_insert_own" on public.usage_logs;
drop policy if exists "subscriptions_select_own" on public.subscriptions;

create policy "users_select_own"
  on public.users
  for select
  using (auth.uid() = id);

create policy "users_insert_own"
  on public.users
  for insert
  with check (auth.uid() = id);

create policy "users_update_own"
  on public.users
  for update
  using (auth.uid() = id);

create policy "invoices_select_own"
  on public.invoices
  for select
  using (auth.uid() = user_id);

create policy "invoices_insert_own"
  on public.invoices
  for insert
  with check (auth.uid() = user_id);

create policy "invoices_update_own"
  on public.invoices
  for update
  using (auth.uid() = user_id);

create policy "usage_logs_select_own"
  on public.usage_logs
  for select
  using (auth.uid() = user_id);

create policy "usage_logs_insert_own"
  on public.usage_logs
  for insert
  with check (auth.uid() = user_id);

create policy "subscriptions_select_own"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);
