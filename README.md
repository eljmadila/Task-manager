# Task Manager

A simple, responsive task management web app built with React , Vite and Supabase. This project provides a minimal, fast starting point for managing tasks (create, edit, update and delete).

## Features
- Create, edit, and delete tasks
- Responsive UI for desktop and mobile
- fetch data from the supabase database
- Built with React + Vite for fast dev feedback (HMR)

## Tech stack
- React (functional components + hooks)
- Vite (dev server and build)
- Supabase (Baas)
- CSS Modules / plain CSS / your preferred styling solution
- Optional: TypeScript, linting (Oxc, ESLint), and formatting (Prettier)

## Prerequisites
- Node.js 18+ (or latest LTS)
- npm, yarn, or pnpm

## Getting started (local)
1. Clone the repository
   git clone https://github.com/eljmadila/Task-manager.git
2. Install dependencies
   npm install
   # or
   # yarn install
   # pnpm install
3. Start the dev server
   npm run dev
   # or
   # yarn dev
   # pnpm dev
4. Open the app in your browser:
   http://localhost:5173

## Available scripts
- npm run dev — Start Vite dev server (HMR)
- npm run build — Build production static files
- npm run preview — Serve the built production files locally
- npm run lint — Run linter (if configured)
- npm run format — Run code formatter (if configured)
- npm test — Run tests (if present)

(Adjust scripts to match your package.json if they differ.)

## Environment variables
Create a `.env` file in the project root for runtime settings:
- VITE_API_URL=https://api.example.com

Note: Vite exposes only variables prefixed with `VITE_` to the client bundle.

## Deployment
The app builds to static files (dist/) that can be hosted on:
- Netlify, Vercel, GitHub Pages
- Any static hosting (S3 + CloudFront, nginx)
Build and preview:
- npm run build
- npm run preview

## Tests
If tests are added (Jest / React Testing Library / Vitest), run:
- npm test

## Linting & formatting
If you use ESLint / Prettier / Oxc:
- npm run lint
- npm run format

Add pre-commit hooks (husky) to enforce formatting and linting on commit.

## Contributing
1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes and push
4. Open a pull request with a clear description of your change

Please include tests for new features where appropriate.

## Roadmap / Optional improvements
- Add user authentication
- Persist tasks on a backend (REST or GraphQL)
- Add due dates, reminders, and prioritization
- Add drag-and-drop ordering
- Add tests and CI (GitHub Actions)

## License
Specify your license here (MIT, Apache-2.0, etc.) — or add a LICENSE file.

## Author
Elj Madila — https://github.com/eljmadila
