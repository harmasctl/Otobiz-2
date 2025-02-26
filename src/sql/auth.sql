-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user',
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_sign_in_at timestamp with time zone,
  metadata jsonb default '{}'::jsonb
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '5f3f9f9b-1b9f-4f9f-9f9f-9f9f9f9f9f9f',
  'authenticated',
  'authenticated',
  'admin@example.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin User"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Insert admin profile
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  role,
  status,
  created_at,
  updated_at
) VALUES (
  '5f3f9f9b-1b9f-4f9f-9f9f-9f9f9f9f9f9f',
  'admin@example.com',
  'Admin User',
  'admin',
  'active',
  now(),
  now()
);