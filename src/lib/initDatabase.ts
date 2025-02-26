import { supabase } from "./supabase";

export async function initDatabase() {
  const sql = `
    -- Enable RLS
    alter table auth.users enable row level security;

    -- Create users table
    create table if not exists public.users (
      id uuid references auth.users on delete cascade primary key,
      email text unique,
      full_name text,
      avatar_url text,
      role text default 'user',
      status text default 'active',
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
      last_sign_in_at timestamp with time zone,
      metadata jsonb default '{}'::jsonb
    );

    -- Enable RLS on users
    alter table public.users enable row level security;

    -- Create policies
    create policy if not exists "Public profiles are viewable by everyone"
      on public.users for select
      using ( true );

    create policy if not exists "Users can update own profile"
      on public.users for update
      using ( auth.uid() = id );

    create policy if not exists "Users can insert their own profile"
      on public.users for insert
      with check ( auth.uid() = id );
  `;

  try {
    const { error } = await supabase.rpc("exec_sql", { sql });
    if (error) throw error;
    console.log("Database initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    return false;
  }
}
