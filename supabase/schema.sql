-- profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  global_level integer not null default 1,
  global_xp integer not null default 0,
  global_gold integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Profiles: select all" on public.profiles for select using (true);
create policy "Profiles: update own" on public.profiles for update using (auth.uid() = id);
create policy "Profiles: insert own" on public.profiles for insert with check (auth.uid() = id);

-- bestiary
create table if not exists public.bestiary (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  creature_theme text not null, level integer not null default 1,
  script_title text not null default '', completed_at timestamptz not null default now()
);
alter table public.bestiary enable row level security;
create policy "Bestiary: select own" on public.bestiary for select using (auth.uid() = user_id);
create policy "Bestiary: insert own" on public.bestiary for insert with check (auth.uid() = user_id);

-- run_history
create table if not exists public.run_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  script_title text not null default '', category text not null default 'default',
  won boolean not null default false, xp_earned integer not null default 0,
  gold_earned integer not null default 0, creature_level integer not null default 1,
  played_at timestamptz not null default now()
);
alter table public.run_history enable row level security;
create policy "RunHistory: own" on public.run_history for all using (auth.uid() = user_id);

-- leaderboard view
create or replace view public.leaderboard as
  select p.username, p.global_level, p.global_xp, p.global_gold,
    count(b.id) as creature_count, count(r.id) filter (where r.won) as wins
  from public.profiles p
  left join public.bestiary b on b.user_id = p.id
  left join public.run_history r on r.user_id = p.id
  group by p.id order by p.global_xp desc;

-- auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email,'@',1)));
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();
