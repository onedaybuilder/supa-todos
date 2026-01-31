# Project Context
- Learning project: guide me through decisions, don't write code for me
- Explain concepts and point to documentation
- Ask questions to help me think through solutions
- Tech stack: Next.js 16, Supabase, Tailwind CSS

# Progress
- Phase 1: Project Setup - Done
- Phase 2: Database Design - Done (conceptual, tables not yet created in Supabase)
- Phase 3: Authentication - Done (email/password + Google OAuth + sign out)
- Phase 4: CRUD Operations - Next (need to create tables in Supabase SQL Editor first)
- Phase 5: Storage - Not started
- Phase 6: Subscriptions - Not started

# Database Schema (Planned)
## profiles
- id (UUID, references auth.users(id), primary key)
- name (text)
- avatar (text, URL)
- created_at (timestamp)

## todos
- id (UUID, primary key)
- user_id (references profiles(id))
- todo (text)
- is_complete (boolean, default false)
- date_added (timestamp, default now())
- due_date (timestamp, nullable)

## photos
- id (UUID, primary key)
- user_id (references profiles(id))
- todo_id (references todos(id))
- photo_url (text)

## Profile table
create table public.profiles (
    id uuid not null references auth.users on delete cascade,
    name text,
    avatar text,
    created_at timestamp default now(),

    primary key (id)
);

##enable row level security
alter table public.profiles enable row level security;


-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, avatar)
  values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'avatar');
  return new;
end;
$$;

-- Create a profile automatically when someone signs up
-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


##select policy
 create policy "Users can read all profiles"                                            
    on public.profiles                                                   
    for select                                            
    to authenticated                                                     
    using (true);  

##update policy
 create policy "Users can update only their profiles"                                            
    on public.profiles                                                   
    for update                                            
    to authenticated                                                     
    using ((select auth.uid()) = id );  

##delete policy
 create policy "Users can delete only their profiles"                                            
    on public.profiles                                                   
    for delete                                            
    to authenticated                                                     
    using ((select auth.uid()) = id );  


------------------------------- TODOS

create table public.todos (
    id uuid default gen_random_uuid(),
    user_id uuid references profiles(id) on delete cascade,
    todo_text text,
    is_complete boolean default false,
    date_added timestamp default now(),
    due_date timestamp,

    primary key (id)
);

##select policy
 create policy "Users can read their todos"                                            
    on public.todos                                                   
    for select                                            
    to authenticated                                                     
    using ((select auth.uid()) = user_id);  


##update policy
 create policy "Users can update only their todos"                                            
    on public.todos                                                   
    for update                                            
    to authenticated                                                     
    using ((select auth.uid()) = user_id );  

##delete policy
 create policy "Users can delete only their todos"                                            
    on public.todos                                                   
    for delete                                            
    to authenticated                                                     
    using ((select auth.uid()) = user_id );  

##insert policy
 create policy "Users can create todos"                                            
    on public.todos                                                   
    for insert                                            
    to authenticated                                                     
    with check ((select auth.uid()) = user_id );  