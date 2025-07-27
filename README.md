# Farm Genie Web App

A modern Next.js web application with Supabase authentication, built with the App Router and Tailwind CSS.

## Features

- 🔐 Authentication with Supabase
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🚀 Ready for Vercel deployment
- 🔒 Protected routes
- ⚡ Fast development with Next.js 14
- 🛡️ **Security-first design with Row-Level Security**

## Pages

- `/login` - User authentication
- `/signup` - User registration
- `/dashboard` - Protected dashboard (requires authentication)

## Security Features

### 🔒 Built-in Security Measures

- **Row-Level Security (RLS)** - Users can only access their own data
- **Environment Variables** - No hardcoded secrets
- **Security Headers** - Protection against common attacks
- **Input Validation** - Client and server-side validation
- **HTTPS Only** - Secure connections in production

### 🛡️ Security Checklist

- [x] Environment variables for all secrets
- [x] Comprehensive `.gitignore` excludes sensitive files
- [x] Supabase RLS policies configured
- [x] Security headers implemented
- [x] Input validation ready
- [x] HTTPS enforced in production

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd farm-genie-web-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Configure Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key
   - Update `.env.local` with your Supabase credentials
   - **IMPORTANT**: Follow the security setup in `supabase-security.md`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### ⚠️ Security Notes

- **Never commit `.env.local` to version control**
- **Only use the `anon` key in client-side code**
- **The `service_role` key should only be used server-side**
- **All environment variables are properly validated**

## Supabase Security Setup

**CRITICAL**: Before deploying, follow the security setup in `supabase-security.md`:

1. Enable Row-Level Security (RLS) on all tables
2. Create proper access policies
3. Set up authentication triggers
4. Configure email confirmation
5. Set password policies

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Environment Variables for Vercel

Set these in your Vercel dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Manual Deployment

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                 # App Router pages
│   ├── login/          # Login page
│   ├── signup/         # Signup page
│   ├── dashboard/      # Protected dashboard
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page (redirects to login)
├── lib/                # Utility functions
│   └── supabase.ts     # Supabase client
└── middleware.ts        # Security middleware
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Language**: TypeScript
- **Security**: Row-Level Security, Security Headers

## Security Best Practices

### For Public Repositories

1. **Environment Variables**: All secrets are in environment variables
2. **RLS Policies**: Data is protected at the database level
3. **Security Headers**: Protection against common attacks
4. **Input Validation**: Both client and server-side validation
5. **HTTPS Only**: Secure connections enforced

### What's Safe to Expose

- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Public project URL
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Designed for client-side use
- ✅ Source code - No secrets in code
- ✅ Configuration files - No sensitive data

### What's Protected

- 🔒 User data (via RLS)
- 🔒 Authentication tokens
- 🔒 Service role keys
- 🔒 Environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
