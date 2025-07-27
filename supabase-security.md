# Supabase Security Configuration Guide

## Row-Level Security (RLS) Setup

To ensure your data is secure even if API keys are exposed, follow these steps:

### 1. Enable RLS on All Tables

In your Supabase dashboard, go to Authentication > Policies and enable RLS on all tables:

```sql
-- Enable RLS on all tables
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
-- Add this for any other tables you create
```

### 2. Create Secure Policies

#### For User Profiles Table:
```sql
-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Policy: Users can only update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policy: Users can only insert their own profile
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

#### For Any Data Tables:
```sql
-- Example for a 'posts' table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own posts
CREATE POLICY "Users can view own posts" ON public.posts
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only create posts for themselves
CREATE POLICY "Users can create own posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own posts
CREATE POLICY "Users can update own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can only delete their own posts
CREATE POLICY "Users can delete own posts" ON public.posts
  FOR DELETE USING (auth.uid() = user_id);
```

### 3. Set Up Authentication Triggers

Create a trigger to automatically create a profile when a user signs up:

```sql
-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. Additional Security Measures

#### Enable Email Confirmation:
1. Go to Authentication > Settings in Supabase
2. Enable "Enable email confirmations"
3. Configure your email provider

#### Set Up Password Policies:
1. Go to Authentication > Settings
2. Configure minimum password length (recommend 8+)
3. Enable password strength requirements

#### Configure Session Management:
1. Go to Authentication > Settings
2. Set appropriate session timeout (e.g., 24 hours)
3. Enable "Refresh token rotation"

### 5. API Security Best Practices

#### Client-Side Security:
- Only use the `anon` key in client-side code
- Never expose the `service_role` key in client code
- Always validate user input on both client and server

#### Server-Side Security:
- Use the `service_role` key only in server-side functions
- Implement proper input validation
- Use parameterized queries to prevent SQL injection

### 6. Environment Variables for Vercel

Set these in your Vercel dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 7. Testing Security

Test your RLS policies by:
1. Creating multiple user accounts
2. Ensuring users can only access their own data
3. Verifying that unauthorized access is blocked

## Security Checklist

- [ ] RLS enabled on all tables
- [ ] Proper policies created for each table
- [ ] Email confirmation enabled
- [ ] Strong password policies configured
- [ ] Session management configured
- [ ] Environment variables set in Vercel
- [ ] No hardcoded secrets in code
- [ ] Input validation implemented
- [ ] HTTPS enabled in production 