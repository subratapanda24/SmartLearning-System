<div align="center">

# SmartLearn

**A full-featured Smart Learning System built with React, Vite, and Tailwind CSS**

![React](https://img.shields.io/badge/React-18-black?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-black?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-black?style=flat-square&logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-v6-black?style=flat-square&logo=reactrouter)
![Recharts](https://img.shields.io/badge/Recharts-2-black?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)

[Live Demo](#) · [Report a Bug](#) · [Request Feature](#)

</div>

---

## About

SmartLearn is a production-grade learning management system interface built as a mini project by Group 5 at School of Future Tech, ITM Skills University. It simulates a complete educational platform — from a public landing page to a full student dashboard — with no backend required.

The design follows a clean black-and-white aesthetic inspired by modern productivity tools, built entirely with React component architecture, client-side routing, and a centralized mock data layer.

---

## Screenshots

> Add your screenshots here after running the project locally.

---

## Features

| Feature | Description |
|---|---|
| **Landing Page** | Hero, features, instructors, testimonials, and pricing |
| **Course Catalog** | Search, category filter, level filter, progress badges |
| **Course Detail** | Overview, Lessons, Quizzes, and Resources tabs |
| **Video Player** | Simulated player with scrubbing and lesson navigation |
| **Interactive Quiz** | A/B/C/D questions with instant feedback and scoring |
| **Progress Dashboard** | Bar chart and line chart analytics via Recharts |
| **Discussion Forum** | Threaded posts with instructor badges and replies |
| **Resources** | File library with type filter and download simulation |
| **Certificates** | Printable completion certificate with unique ID |
| **Instructor Profiles** | Cards with full-detail modal pop-up |

---

## Tech Stack

- **React 18** — Component-based UI with hooks
- **Vite 5** — Fast development server and bundler
- **Tailwind CSS 3** — Utility-first styling
- **React Router v6** — Nested client-side routing
- **Recharts 2** — Bar and line chart visualizations
- **Lucide React** — SVG icon library
- **clsx + tailwind-merge** — Conditional class management
- **DM Sans** — Google Font for clean typography

---

## Project Structure

```
smart-learning/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   └── utils.js              # cn() utility
    ├── data/
    │   └── mockData.js           # All app data (courses, quizzes, forum, etc.)
    ├── components/
    │   ├── ui.jsx                # Button, Card, Badge, Input, ProgressBar...
    │   ├── Layout.jsx            # Authenticated shell (Sidebar + Navbar + Outlet)
    │   ├── Sidebar.jsx           # Left navigation
    │   └── Navbar.jsx            # Top bar with search and profile
    └── pages/
        ├── Landing.jsx           # Public marketing page
        ├── Dashboard.jsx         # Student home
        ├── Courses.jsx           # Course catalog
        ├── CoursePage.jsx        # Course detail
        ├── VideoPlayer.jsx       # Video lesson player
        ├── Quiz.jsx              # Quiz engine
        ├── Progress.jsx          # Analytics dashboard
        ├── Forum.jsx             # Discussion forum
        ├── Resources.jsx         # File library
        ├── Certificate.jsx       # Completion certificate
        └── Instructors.jsx       # Instructor profiles
```

---

## Getting Started

### Prerequisites

- Node.js **v18 or higher**
- npm (comes with Node.js)

Check your version:
```bash
node -v
npm -v
```

### Installation

**1. Create the project**
```bash
npm create vite@latest smart-learning -- --template react
cd smart-learning
```

**2. Install dependencies**
```bash
npm install react-router-dom recharts lucide-react clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**3. Copy all source files**

Copy all files from this repository into their respective paths inside the `src/` directory, and replace `index.html`, `vite.config.js`, `tailwind.config.js`, and `postcss.config.js` in the project root.

**4. Start the development server**
```bash
npm run dev
```

**5. Open in your browser**
```
http://localhost:5173
```

> Port may differ if 5173 is already in use — check the terminal output for the correct URL.

---

## Available Routes

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Public landing page |
| `/app` | Dashboard | Student home with stats |
| `/app/courses` | Courses | Course catalog |
| `/app/courses/:id` | Course Detail | Individual course page |
| `/app/courses/:id/video/:lessonId` | Video Player | Lesson video |
| `/app/quiz/:id` | Quiz | Interactive quiz (try `/app/quiz/1`) |
| `/app/progress` | Progress | Analytics and charts |
| `/app/forum` | Forum | Discussion board |
| `/app/resources` | Resources | File downloads |
| `/app/certificate/:courseId` | Certificate | Try `/app/certificate/4` |
| `/app/instructors` | Instructors | Instructor profiles |

---

## Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

The output will be in the `dist/` folder, ready to deploy to Vercel, Netlify, or any static host.

---

## Deployment

### Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

Drag and drop the `dist/` folder into [netlify.com/drop](https://netlify.com/drop), or connect your GitHub repository for automatic deployments.

### Deploy to GitHub Pages

```bash
npm install -D gh-pages
```

Add to `package.json`:
```json
"homepage": "https://<your-username>.github.io/smart-learning",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Then run:
```bash
npm run deploy
```

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.0",
    "recharts": "^2.12.7",
    "lucide-react": "^0.395.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "vite": "^5.2.11",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^3.4.3",
    "postcss": "^8.4.38",
    "autoprefixer": "^10.4.19"
  }
}
```

---

## Team

**Group 5 — Problem Statement 05**
School of Future Tech, ITM Skills University | Cohort: Larry Page | 2025–2029

| Name | Role |
|---|---|
 Subrata Panda 
 Japji Kaur 
 Sanika Kangane 
 Parth Sarova 

---

## License

This project is for academic purposes as part of the ITM Skills University mini project curriculum.

---

<div align="center">
Made with React by Group 5 — School of Future Tech
</div>