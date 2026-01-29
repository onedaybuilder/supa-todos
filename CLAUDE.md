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
