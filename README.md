# Farm Genie Web App

A modern Next.js web application with Supabase authentication, built with the App Router and Tailwind CSS.

## Features

- 🔐 Authentication with Supabase
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🚀 Ready for Vercel deployment
- 🔒 Protected routes
- ⚡ Fast development with Next.js 14

## Pages

- `/login` - User authentication
- `/signup` - User registration
- `/dashboard` - Protected dashboard (requires authentication)

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

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

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
└── lib/                # Utility functions
    └── supabase.ts     # Supabase client
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Language**: TypeScript

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
