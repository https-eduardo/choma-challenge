# Todo App (Choma Challenge)

A modern, responsive Todo application built with Next.js 15, React 19, and TypeScript.

## Features

- ✨ Beautiful gradient UI with smooth animations
- 📧 Email-based user authentication
- ✅ Create, read, update, and delete tasks
- 📝 Add notes to tasks
- 🔄 Mark tasks as complete/incomplete
- 📱 Responsive design for all devices
- ⚡ Real-time updates with React Query
- 🎨 Modern UI components with Radix UI

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn (Radix UI)
- **State Management**: TanStack React Query
- **Icons**: Lucide React
- **Database**: Supabase (backend)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd choma-challenge
```

2. Install dependencies

```bash
npm install
```

3. Setup environment variables

- Following the .env.example, create a `.env` file and insert your environment variables.

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your email on the home page
2. Access your personal task management dashboard
3. Create new tasks with optional notes
4. Mark tasks as complete or incomplete
5. Edit task details inline
6. Delete tasks when no longer needed

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/           # Next.js app router pages
├── components/    # React components
├── lib/          # Utilities and API functions
└── ui/           # Reusable UI components
```
