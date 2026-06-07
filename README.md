# CareerPilot

A full-stack AI-powered career management platform that helps professionals build resumes, track job applications, and sharpen their skills through AI-generated quizzes — all in one place.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Frontend Pages](#frontend-pages)
- [State Management](#state-management)
- [Authentication Flow](#authentication-flow)
- [AI Integrations](#ai-integrations)

---

## Features

- **Authentication** — Secure signup/login with JWT stored in HTTP-only cookies and session persisted in `localStorage`.
- **Resume Builder** — Multi-step form to build professional resumes with AI-generated summaries, experience bullet points, and project descriptions powered by Gemini.
- **Resume PDF Export** — Download resumes as styled PDFs using `@react-pdf/renderer`.
- **Job Search** — Search live LinkedIn job listings via RapidAPI with one click.
- **Job Tracker** — Save jobs and mark them as applied to track your pipeline.
- **AI Quiz** — Generate 10-question MCQ quizzes on any topic and difficulty level using Gemini, with instant scoring and a detailed results breakdown.
- **Dashboard** — Aggregated view of resume count, saved/applied jobs, quiz attempts, and latest activity.
- **Toast Notifications** — Non-blocking error and status feedback via `sonner`.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework and build tool |
| Redux Toolkit | Global state management |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Sonner | Toast notifications |
| Lucide React | Icon library |
| Axios | HTTP client |
| @react-pdf/renderer | PDF generation |
| @google/generative-ai | Gemini AI (client-side) |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and ODM |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT auth tokens |
| helmet | HTTP security headers |
| morgan | Request logging |
| express-rate-limit | Rate limiting |
| @google/generative-ai | Gemini AI (server-side quiz generation) |
| axios | LinkedIn RapidAPI calls |
| nodemon | Dev auto-restart |

---

## Project Structure

```
CareerPilot/
├── backend/
│   └── src/
│       ├── app.js                  # Express app setup, middleware, routes
│       ├── server.js               # HTTP server entry point
│       ├── config/
│       │   └── db.js               # MongoDB connection
│       ├── controllers/
│       │   ├── authController.js   # Signup, login, logout
│       │   ├── dashboardController.js
│       │   ├── jobController.js    # Save, apply, search LinkedIn jobs
│       │   ├── quizController.js   # Generate, submit, history
│       │   └── resumeController.js # CRUD resumes + AI summary
│       ├── middlewares/
│       │   └── authMiddleware.js   # JWT verification
│       ├── models/
│       │   ├── Job.js
│       │   ├── Quiz.js
│       │   ├── QuizResult.js
│       │   ├── Resume.js
│       │   └── User.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── dashboardRoutes.js
│       │   ├── jobRoutes.js
│       │   ├── quizRoutes.js
│       │   └── resumeRoutes.js
│       └── utils/
│           └── geminiQuizGenerator.js  # Gemini MCQ prompt + parser
│
└── frontend/
    └── src/
        ├── App.jsx                 # Routes + Toaster
        ├── main.jsx
        ├── index.css               # Tailwind theme + custom utilities
        ├── app/
        │   └── store.js            # Redux store
        ├── components/
        │   ├── Navbar.jsx
        │   ├── QuizResultCard.jsx
        │   ├── ResumeCard.jsx
        │   ├── ResumeTemplate.jsx
        │   ├── pdf/
        │   │   └── ResumePDF.jsx   # PDF layout
        │   └── resumeSteps/        # Multi-step resume form sections
        ├── features/               # Redux slices + thunk actions
        │   ├── auth/
        │   ├── dashboard/
        │   ├── jobs/
        │   ├── quiz/
        │   └── resume/
        ├── layout/
        │   └── ProtectedRoute.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Signup.jsx
        │   ├── Dashboard.jsx
        │   ├── ResumeBuilder.jsx
        │   ├── ViewResume.jsx
        │   ├── Jobs.jsx
        │   └── Quiz.jsx
        └── services/
            ├── AIModel.js          # Gemini client (frontend)
            └── api.js              # Axios instance with auth header
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Google AI Studio](https://aistudio.google.com/) API key (Gemini)
- A [RapidAPI](https://rapidapi.com/) account with access to a LinkedIn Jobs API

### Environment Variables

#### `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/careerpilot
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
RAPID_API_KEY=your_rapidapi_key
RAPID_API_LINKEDIN_HOST=linkedin-job-search-api.p.rapidapi.com
```

#### `frontend/.env`

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

> **Note:** The frontend uses Gemini directly for AI resume suggestions (summaries, experience bullets, project descriptions). The backend uses Gemini separately for quiz generation.

### Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the App

```bash
# Start backend (runs on http://localhost:5000)
cd backend
npm run dev

# Start frontend (runs on http://localhost:5173)
cd frontend
npm run dev
```

---

## API Reference

All routes are prefixed with `/api`. Protected routes require a valid JWT in the `token` HTTP-only cookie.

### Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/signup` | Public | Register a new user |
| POST | `/login` | Public | Login and receive JWT cookie |
| POST | `/logout` | Protected | Clear auth cookie |

### Resumes — `/api/resumes`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Protected | Create a new resume |
| GET | `/` | Protected | Get all resumes for the logged-in user |
| GET | `/:id` | Protected | Get a single resume by ID |
| DELETE | `/:id` | Protected | Delete a resume |
| POST | `/generate/summary` | Protected | AI-generate a professional summary |

### Jobs — `/api/jobs`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/search/linkedin?query=` | Protected | Search live LinkedIn jobs |
| POST | `/save` | Protected | Save a job to the tracker |
| GET | `/mine` | Protected | Get all saved/applied jobs |
| POST | `/apply/:id` | Protected | Mark a saved job as applied |

### Quiz — `/api/quiz`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/generate` | Protected | Generate 10 MCQs with Gemini |
| POST | `/submit` | Protected | Submit answers and get score |
| GET | `/history` | Protected | Get past quiz results |

### Dashboard — `/api/dashboard`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Protected | Returns stats, latest activity, resumes, and jobs |

---

## Frontend Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with feature overview |
| `/signup` | Signup | User registration form |
| `/login` | Login | User login form |
| `/dashboard` | Dashboard | Stats overview + recent activity |
| `/resume-builder` | ResumeBuilder | Multi-step AI-assisted resume editor |
| `/view-resume/:id` | ViewResume | View + download a resume as PDF |
| `/jobs` | Jobs | LinkedIn job search + personal tracker |
| `/quiz` | Quiz | AI quiz generator + result display |

All routes except `/`, `/login`, and `/signup` are protected by `ProtectedRoute`, which redirects unauthenticated users to `/login`.

---

## State Management

Redux Toolkit is used with separate slices for each feature:

| Slice | State |
|-------|-------|
| `authSlice` | `user`, `loading` |
| `dashboardSlice` | `data`, `loading` |
| `jobSlice` | `searchResults`, `myJobs`, `loading` |
| `quizSlice` | `quiz`, `result`, `history`, `loading` |
| `resumeSlice` | `resumes`, `loading` |

Async operations are handled via thunk action creators in `*Actions.js` files. Errors surface via `toast.error()` from `sonner`.

---

## Authentication Flow

1. User submits login/signup form.
2. Backend hashes password with `bcryptjs`, creates a JWT signed with `JWT_SECRET` (1-day expiry).
3. JWT is set as an `httpOnly` cookie on the response.
4. User data (id, name, email) is returned in JSON and saved to `localStorage`.
5. On subsequent requests, the Axios instance reads the stored token and sends it as a `Bearer` header (in addition to the cookie).
6. `authMiddleware` verifies the cookie token and attaches the user to `req.user`.
7. On logout, the cookie is cleared and `localStorage` is wiped.

---

## AI Integrations

### Quiz Generation (Backend — Gemini 2.5 Flash)

Located in `backend/src/utils/geminiQuizGenerator.js`. Sends a structured prompt to Gemini requesting 10 MCQs in pure JSON format. Strips markdown formatting before parsing.

### Resume AI Assistance (Frontend — Gemini 2.5 Flash)

Located in `frontend/src/services/AIModel.js`. Used in:
- **StepSummary** — Generate a professional summary based on the user's role.
- **StepExperience** — Generate 3 ATS-optimized bullet points per job entry.
- **StepProjects** — Generate 3 ATS-friendly bullet points per project.

All prompts are crafted to return clean, formatted output ready to be embedded into the resume form.
