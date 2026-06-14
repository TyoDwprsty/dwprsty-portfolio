# Portfolio Project Documentation

## Features & Additions
This project is a modern, responsive developer portfolio built with performance, aesthetics, and high interactivity in mind.

### Core Technologies
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS & Custom CSS Themes
- **Animations:** Framer Motion
- **Database:** Prisma ORM connected to Supabase PostgreSQL
- **Authentication:** Supabase Auth
- **Icons:** Custom animated SVG icons (React, Next.js, GitHub, LinkedIn, Globe, Mail, etc.) and Lucide React

### Key UI Features
- **Dynamic Theming:** Seamless Dark/Light mode toggle with smooth color transitions across all components.
- **Glassmorphism:** Frosted glass effects on the sticky Navbar (mobile and desktop) inspired by iOS liquid glass.
- **Scroll Spy Navigation:** The Navbar automatically highlights the active section based on the user's scroll position in the viewport.
- **3D Interaction Card:** A highly interactive profile card featuring 3D rotation based on mouse coordinates, with dynamic ambient lighting and drop-shadows.
- **Draggable Mobile Bubble:** A customized Framer Motion draggable bubble on mobile layouts that smartly snaps to the screen edges with physics-based spring animations.
- **Animated Background:** A seamless vertically scrolling pattern background that responds to light/dark themes.

---

## Setup & Local Development

To run this project on a new device, follow these steps:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- Git

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd portfolio-dwprsty
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Variables
Copy the `.env.example` file to create a local `.env` file:
```bash
cp .env.example .env
```
Fill in your Supabase credentials and database URIs in the `.env` file (refer to the `.env.example` structure).

### 5. Database Setup (Prisma)
Generate the Prisma client and push your schema to the Supabase database:
```bash
npx prisma generate
npx prisma db push
```

### 6. Start the Development Server
```bash
npm run dev
```
The site will be available at [http://localhost:3000](http://localhost:3000).

---

## Deployment

The easiest way to deploy this Next.js application is via [Vercel](https://vercel.com).

### Step-by-Step Vercel Deployment:
1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Log into [Vercel](https://vercel.com) and click **Add New > Project**.
3. Import your repository.
4. In the configuration settings, locate the **Environment Variables** section.
5. Add all the variables from your `.env` file:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_EMAILS`
6. Click **Deploy**. Vercel will automatically build the Next.js app and run your Prisma generators.

---

## Environment Variables Reference (`.env.example`)
```env
# Database Connection (Prisma)
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres"
DIRECT_URL="postgresql://postgres:password@localhost:5432/postgres"

# Supabase Authentication
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Admin Configuration
ADMIN_EMAILS="your.email@domain.com,another.email@domain.com"
```
