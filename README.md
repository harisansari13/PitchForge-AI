<div align="center">

<br />

# ⚡ PitchForge AI

### Transform startup ideas into investor-ready business pitches — powered by Google Gemini.

<br />

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

<br />

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/harisansari/pitchforge-ai?style=flat-square)](https://github.com/harisansari/pitchforge-ai/commits/main)
[![Issues](https://img.shields.io/github/issues/harisansari/pitchforge-ai?style=flat-square)](https://github.com/harisansari/pitchforge-ai/issues)
[![Stars](https://img.shields.io/github/stars/harisansari/pitchforge-ai?style=flat-square)](https://github.com/harisansari/pitchforge-ai/stargazers)
[![Forks](https://img.shields.io/github/forks/harisansari/pitchforge-ai?style=flat-square)](https://github.com/harisansari/pitchforge-ai/network/members)
[![Repo Size](https://img.shields.io/github/repo-size/harisansari/pitchforge-ai?style=flat-square)](https://github.com/harisansari/pitchforge-ai)

<br />

**[🚀 Live Demo](#demo) · [📖 Documentation](#api-documentation) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)**

<br />

</div>

---

## Table of Contents

- [Overview](#overview)
- [Project Highlights](#project-highlights)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [AI Workflow](#ai-workflow)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
- [Performance](#performance)
- [Security](#security)
- [Deployment](#deployment)
- [Challenges Faced](#challenges-faced)
- [What I Learned](#what-i-learned)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)
- [Author](#author)

---

## Overview

**PitchForge AI** is a production-grade, full-stack SaaS application that transforms a raw startup idea into a complete, investor-ready business pitch in seconds.

### The Problem

Founders, students, and first-time entrepreneurs struggle to articulate their ideas clearly to investors. Crafting a structured pitch — with a clear problem statement, business model, competitive landscape, and financial framing — takes days and often requires expensive consultants or advisors.

### The Solution

PitchForge AI automates the entire pitch-building process. Users provide three inputs — a startup idea, the target industry, and a revenue model — and receive a professional pitch package powered by Google Gemini 1.5 Flash, complete with scoring, analysis, and a downloadable PDF report.

### Who Is It For?

| Audience | Use Case |
|---|---|
| **Early-stage founders** | Quickly structure and validate their pitch narrative |
| **Hackathon teams** | Generate investor-ready decks within minutes |
| **Business students** | Learn pitch structure through real AI-generated examples |
| **Startup incubators** | Evaluate and structure ideas at scale |
| **Career switchers** | Explore entrepreneurship without prior pitch experience |

### Business Value

- Reduces pitch preparation time from days to seconds
- Provides structured, credible investor framing
- Delivers all analysis in one place — no separate tools needed
- Works fully offline (with fallbacks) — no Gemini key required for demos
- Production-ready architecture deployable on any cloud platform

---

## Project Highlights

| | Feature |
|---|---|
| ✅ | AI-powered startup pitch generation via Google Gemini 1.5 Flash |
| ✅ | Investor-ready reports with problem, solution, business model, and market opportunity |
| ✅ | Four-dimension startup score engine (Innovation · Market Demand · Scalability · Investor Appeal) |
| ✅ | Full SWOT analysis tailored to each startup |
| ✅ | Competitor landscape analysis with market positioning |
| ✅ | Seed-to-series valuation range estimator with reasoning |
| ✅ | One-click PDF export with complete report and score table |
| ✅ | JWT-based user authentication (signup, login, protected profile) |
| ✅ | Persistent pitch history with links to every previous report |
| ✅ | Responsive, modern UI built with Tailwind CSS and Framer Motion |
| ✅ | Graceful AI fallbacks — never crashes without a Gemini key |
| ✅ | In-memory database mode — runs without MongoDB for local demos |
| ✅ | IP-based rate limiting built into the FastAPI middleware stack |
| ✅ | Interactive Swagger API documentation at `/docs` |

---

## Demo

> **Live Demo:** [pitchforge-ai.vercel.app](#) *(deploy your own instance — see [Deployment](#deployment))*

### Quick Demo Flow

```
1. Open the app  →  Click "Generate Pitch"
2. Describe your startup idea in plain language
3. Select your industry and revenue model
4. Click "Generate"  →  receive a full pitch report in seconds
5. Export to PDF  →  share with investors
```

> To add a screen recording or GIF demo, record your workflow with [LICEcap](https://www.cockos.com/licecap/) or [Kap](https://getkap.co/) and replace the placeholder below.

```
[Demo GIF placeholder — add demo.gif to /public and reference it here]
![PitchForge AI Demo](public/demo.gif)
```

---

## Screenshots

> Replace each placeholder below with an actual screenshot after deployment.

**Landing Page**
```
![Landing Page](docs/screenshots/landing.png)
```

**Dashboard — Pitch Form**
```
![Dashboard](docs/screenshots/dashboard.png)
```

**AI-Generated Pitch Report**
```
![Pitch Report](docs/screenshots/pitch-report.png)
```

**Startup Score Engine**
```
![Score Engine](docs/screenshots/scores.png)
```

**SWOT Analysis**
```
![SWOT Analysis](docs/screenshots/swot.png)
```

**Competitor Analysis**
```
![Competitor Analysis](docs/screenshots/competitors.png)
```

**Valuation Estimator**
```
![Valuation](docs/screenshots/valuation.png)
```

**PDF Export**
```
![PDF Export](docs/screenshots/pdf-export.png)
```

---

## AI Workflow

```
  User Input
  ┌─────────────────────────────────────────┐
  │  Startup Idea + Industry + Revenue Model │
  └───────────────────┬─────────────────────┘
                      │
                      ▼
             React Frontend
          (Dashboard form submit)
                      │
                      ▼
          FastAPI Backend (POST /api/generate-pitch)
                      │
                      ▼
         ┌────────────────────────┐
         │     Google Gemini      │
         │   (1.5 Flash model)    │
         │  JSON-structured prompt│
         └────────────┬───────────┘
                      │  (parallel enrichment)
          ┌───────────┼────────────┐
          ▼           ▼            ▼
     Pitch Text   Score Engine   SWOT
      + Business  (4 dimensions) Analysis
        Model
          │           │            │
          ▼           ▼            ▼
    Competitor    Valuation     MongoDB
     Analysis     Estimator      Atlas
          │           │            │
          └───────────┴────────────┘
                      │
                      ▼
             Full Pitch Report
          (Results page + PDF export)
```

---

## Features

| Feature | Description | Status |
|---|---|---|
| **AI Pitch Builder** | Generates all pitch sections from plain-language input via Gemini 1.5 Flash | ✅ Live |
| **Startup Score Engine** | Scores Innovation, Market Demand, Scalability, and Investor Appeal on a 0–100 scale | ✅ Live |
| **SWOT Analysis** | Strengths, weaknesses, opportunities, and threats tailored to the startup concept | ✅ Live |
| **Competitor Analysis** | Three positioned competitors with strengths, weaknesses, and market insights | ✅ Live |
| **Valuation Estimator** | Low / medium / high pre-seed to seed-stage valuation ranges with reasoning | ✅ Live |
| **PDF Export** | ReportLab-powered report download — all sections, scores, and valuation in one file | ✅ Live |
| **Pitch History** | Persistent list of all generated pitches with links back to each full report | ✅ Live |
| **JWT Authentication** | Signup, login, and protected profile via bcrypt + python-jose | ✅ Live |
| **Graceful Fallbacks** | Every AI method returns structured data even without a Gemini key | ✅ Live |
| **In-Memory Mode** | Full feature set runs without MongoDB — great for local demos | ✅ Live |
| **Rate Limiting** | IP-based sliding-window limiter in the FastAPI middleware stack | ✅ Live |
| **Swagger Docs** | Interactive API explorer available at `/docs` | ✅ Live |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 18 | UI framework |
| [Vite](https://vitejs.dev) | 6 | Build tool and dev server |
| [React Router](https://reactrouter.com) | v7 | Client-side routing |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Page and element animations |
| [Lucide React](https://lucide.dev) | latest | Icon library |
| Fetch API | native | HTTP client (custom wrapper) |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| [FastAPI](https://fastapi.tiangolo.com) | 0.115 | REST API framework |
| [Python](https://python.org) | 3.11+ | Language runtime |
| [Uvicorn](https://www.uvicorn.org) | 0.30 | ASGI server |
| [Pydantic](https://docs.pydantic.dev) | v2 | Request validation and serialization |
| [ReportLab](https://reportlab.com) | 4.2 | PDF generation |

### Database

| Technology | Purpose |
|---|---|
| [MongoDB Atlas](https://mongodb.com/atlas) | Cloud-hosted NoSQL — pitches and user accounts |
| [PyMongo](https://pymongo.readthedocs.io) | Python MongoDB driver |
| In-memory dict store | Zero-config fallback when no MongoDB URI is set |

### AI

| Technology | Purpose |
|---|---|
| [Google Gemini 1.5 Flash](https://ai.google.dev) | Pitch generation, scoring, SWOT, competitor analysis, valuation |
| `google-generativeai` SDK | Python client for the Gemini API |
| Deterministic fallbacks | Structured data generation when Gemini is unavailable |

### Authentication

| Technology | Purpose |
|---|---|
| `passlib[bcrypt]` | Secure password hashing |
| `python-jose[cryptography]` | JWT token creation and verification |
| HTTP Bearer scheme | Stateless token-based auth on protected routes |

### Deployment

| Platform | Purpose |
|---|---|
| [Vercel](https://vercel.com) | Frontend hosting with SPA rewrites |
| [Render](https://render.com) / [Railway](https://railway.app) | Backend hosting |
| [MongoDB Atlas](https://mongodb.com/atlas) | Managed database (free tier available) |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                           Browser                            │
│                                                              │
│   Landing  ──►  Dashboard  ──►  Results                      │
│   (/)           (/dashboard)    (/results/:id)               │
│                                                              │
│   React Router v7 SPA  ·  Tailwind CSS  ·  Framer Motion     │
└──────────────────────────┬───────────────────────────────────┘
                           │  REST / JSON  (fetch API)
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                      FastAPI Backend                         │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Middleware Stack                                    │    │
│  │  CORS  ·  TrustedHost  ·  Rate Limiter              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  Routes                                                      │
│  ├── POST  /api/generate-pitch                               │
│  ├── POST  /api/generate-score                               │
│  ├── POST  /api/generate-swot                                │
│  ├── POST  /api/generate-competitors                         │
│  ├── POST  /api/generate-valuation                           │
│  ├── GET   /api/pitch/{id}                                   │
│  ├── GET   /api/history                                      │
│  ├── POST  /api/export-pdf                                   │
│  ├── POST  /auth/signup                                      │
│  ├── POST  /auth/login                                       │
│  └── GET   /auth/profile   (Bearer token required)           │
│                                                              │
│  Services                                                    │
│  ├── AIService      →  Gemini 1.5 Flash + fallbacks          │
│  ├── PitchService   →  MongoDB CRUD + in-memory fallback     │
│  └── AuthService    →  bcrypt hashing + JWT sign/verify      │
└──────────────┬───────────────────────────┬───────────────────┘
               │                           │
               ▼                           ▼
      MongoDB Atlas                  Google Gemini
      pitches · users                1.5 Flash API
      indexes on email,
      created_at
```

---

## Folder Structure

```
pitchforge-ai/
│
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   │   └── pitch_controller.py    # Orchestrates service calls per request
│   │   ├── database/
│   │   │   └── connection.py          # MongoDB singleton, indexes, graceful fallback
│   │   ├── models/
│   │   │   ├── auth_models.py         # Pydantic models — UserSignup, UserLogin
│   │   │   └── pitch.py               # Pydantic models — pitch requests + serialization
│   │   ├── routes/
│   │   │   ├── auth_routes.py         # /auth/* — signup, login, profile
│   │   │   └── pitch_routes.py        # /api/* — all pitch and PDF endpoints
│   │   ├── services/
│   │   │   ├── ai_service.py          # Gemini wrapper with deterministic fallbacks
│   │   │   ├── auth_service.py        # JWT creation/verification + bcrypt helpers
│   │   │   └── pitch_service.py       # CRUD operations + in-memory fallback store
│   │   └── __init__.py
│   │
│   ├── main.py                        # App factory — middleware, lifespan, routers
│   ├── requirements.txt               # Pinned Python dependencies
│   ├── Procfile                       # Render / Railway start command
│   └── .env.example                   # All environment variables documented
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.jsx             # Reusable button — primary / secondary variants
│   │   │   ├── Layout.jsx             # Shell wrapper + active-link Navbar
│   │   │   ├── Motion.jsx             # Page transition + reveal animation wrappers
│   │   │   ├── PitchCard.jsx          # Content card with accent border
│   │   │   └── ScoreBar.jsx           # Animated score bar with null-safe display
│   │   ├── hooks/
│   │   │   └── usePitchGeneration.js  # Generate pitch + parallel enrichment hook
│   │   ├── pages/
│   │   │   ├── Landing.jsx            # Marketing homepage
│   │   │   ├── Dashboard.jsx          # Pitch form + idea starters + history sidebar
│   │   │   ├── Results.jsx            # Full pitch report — all sections and scores
│   │   │   └── NotFound.jsx           # 404 fallback page
│   │   ├── services/
│   │   │   └── api.js                 # Typed fetch wrapper for every backend endpoint
│   │   ├── App.jsx                    # React Router v7 route declarations
│   │   ├── main.jsx                   # React root mount + BrowserRouter
│   │   └── styles.css                 # Tailwind directives and global design tokens
│   │
│   ├── index.html                     # Root HTML — OG tags, favicon, meta
│   ├── vite.config.js                 # Dev proxy (/api → backend) + build options
│   ├── tailwind.config.js             # Tailwind theme and content paths
│   ├── vercel.json                    # SPA rewrite rules for client-side routing
│   └── .env.example                   # Frontend environment variables
│
└── README.md
```

---

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed and ready:

| Requirement | Version | Notes |
|---|---|---|
| [Python](https://python.org/downloads/) | 3.11+ | Required for the backend |
| [Node.js](https://nodejs.org) | 18+ | Required for the frontend |
| [MongoDB Atlas](https://mongodb.com/atlas) | — | Free tier cluster works fine |
| [Google AI Studio](https://aistudio.google.com) | — | Free Gemini API key |

> **Note:** The app runs without MongoDB and without a Gemini key thanks to built-in fallbacks. You can start it locally with zero external dependencies.

---

### 1 — Clone the repository

```bash
git clone https://github.com/harisansari/pitchforge-ai.git
cd pitchforge-ai
```

---

### 2 — Backend setup

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

# Install all dependencies
pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env
# Open .env and fill in: MONGODB_URI, GEMINI_API_KEY, SECRET_KEY
```

---

### 3 — Frontend setup

```bash
cd frontend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env.local
# Set VITE_API_URL=http://127.0.0.1:8000
```

---

## Environment Variables

### Backend — `backend/.env`

| Variable | Required | Default | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | Recommended | — | Google Gemini API key. Graceful fallbacks activate without it. |
| `GEMINI_MODEL` | No | `gemini-1.5-flash` | Gemini model name to use |
| `MONGODB_URI` | Recommended | — | MongoDB Atlas connection string. In-memory mode activates without it. |
| `DATABASE_NAME` | No | `pitchforge` | MongoDB database name |
| `SECRET_KEY` | **Yes** | — | JWT signing secret. Generate: `python -c "import secrets; print(secrets.token_urlsafe(32))"` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | `30` | JWT token time-to-live in minutes |
| `FRONTEND_URLS` | No | `http://localhost:5173` | Comma-separated CORS allowed origins |
| `ALLOWED_HOSTS` | No | `localhost,127.0.0.1` | Comma-separated trusted host names |
| `CORS_ORIGIN_REGEX` | No | `https://.*\.vercel\.app` | Regex for wildcard CORS origins (e.g. Vercel previews) |
| `RATE_LIMIT_REQUESTS` | No | `80` | Max requests per IP per window |
| `RATE_LIMIT_WINDOW_SECONDS` | No | `60` | Rate limit sliding window in seconds |
| `PORT` | No | `8000` | Server port |

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore`.

### Frontend — `frontend/.env.local`

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | Backend base URL — e.g. `http://127.0.0.1:8000`. The `/api` prefix is appended automatically by the client. |

---

## Running Locally

### Start the backend

```bash
cd backend

# With virtual environment activated:
python main.py

# Or with uvicorn directly:
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

| Endpoint | URL |
|---|---|
| API root | `http://127.0.0.1:8000` |
| Swagger UI | `http://127.0.0.1:8000/docs` |
| ReDoc | `http://127.0.0.1:8000/redoc` |
| Health check | `http://127.0.0.1:8000/health` |

### Start the frontend

```bash
cd frontend
npm run dev
```

App runs at **`http://localhost:5173`**

> The Vite dev server proxies all `/api` requests to `http://127.0.0.1:8000` automatically — no manual CORS configuration needed during development.

---

## API Documentation

> Full interactive documentation is available at `http://127.0.0.1:8000/docs` when the backend is running.

### Pitch Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/generate-pitch` | No | Generate a complete AI pitch from idea, industry, and revenue model |
| `POST` | `/api/generate-score` | No | Score an existing pitch on four dimensions |
| `POST` | `/api/generate-swot` | No | Generate a SWOT analysis for an existing pitch |
| `POST` | `/api/generate-competitors` | No | Generate a competitor analysis for an existing pitch |
| `POST` | `/api/generate-valuation` | No | Estimate a valuation range for an existing pitch |
| `GET` | `/api/pitch/{pitch_id}` | No | Retrieve the full pitch document with all enrichment data |
| `GET` | `/api/history` | No | Return recent pitches, newest first (`?limit=10&skip=0`) |
| `POST` | `/api/export-pdf` | No | Stream a PDF report for download |
| `GET` | `/api/health` | No | API health check |

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/signup` | No | Register a new user account |
| `POST` | `/auth/login` | No | Authenticate and receive a JWT access token |
| `GET` | `/auth/profile` | Bearer | Return the authenticated user's profile |

---

### Request & Response Examples

#### `POST /api/generate-pitch` — `201 Created`

```json
// Request
{
  "startup_idea": "AI platform for clinic appointment management",
  "industry": "Healthcare SaaS",
  "revenue_model": "Monthly subscription per clinic"
}

// Response
{
  "success": true,
  "pitch_id": "64f3a1b2c3d4e5f6a7b8c9d0",
  "data": {
    "startup_name": "CliniqPilot",
    "elevator_pitch": "CliniqPilot helps independent clinics eliminate no-shows...",
    "problem_statement": "...",
    "solution": "...",
    "business_model": "...",
    "revenue_streams": ["Monthly SaaS subscription", "Premium analytics add-on"],
    "market_opportunity": "...",
    "investor_summary": "..."
  }
}
```

#### `POST /api/generate-score` — `200 OK`

```json
// Request
{ "pitch_id": "64f3a1b2c3d4e5f6a7b8c9d0" }

// Response
{
  "success": true,
  "data": {
    "innovation_score": 84,
    "market_demand_score": 79,
    "scalability_score": 88,
    "investor_appeal_score": 82,
    "overall_score": 83
  }
}
```

#### `POST /auth/signup` — `201 Created`

```json
// Request
{
  "name": "Jane Founder",
  "email": "jane@example.com",
  "password": "securepassword123"
}

// Response
{ "success": true, "message": "User registered successfully" }
```

#### `POST /auth/login` — `200 OK`

```json
// Request
{ "email": "jane@example.com", "password": "securepassword123" }

// Response
{ "access_token": "eyJhbGciOiJIUzI1NiIs...", "token_type": "bearer" }
```

---

## Performance

PitchForge AI is designed to be fast and lightweight from the ground up.

| Area | Approach |
|---|---|
| **Async API** | FastAPI with full async/await support — non-blocking I/O throughout |
| **Parallel enrichment** | Score, SWOT, competitors, and valuation fire concurrently via `Promise.allSettled` |
| **MongoDB indexes** | Compound index on `created_at` for history queries; unique index on `email` for login |
| **AI fallbacks** | Deterministic fallbacks avoid retry loops and keep p99 latency stable |
| **Optimized build** | Vite produces a single ~324 kB gzipped JS bundle with tree-shaking |
| **Lazy rendering** | Results page renders sections progressively as data loads |
| **Rate limiting** | Sliding-window limiter prevents abuse without impacting normal usage |

---

## Security

| Layer | Measure |
|---|---|
| **Passwords** | bcrypt hashing via `passlib` — salted, work-factor tunable |
| **Authentication** | Stateless JWT signed with `HS256` — no session storage required |
| **Token expiry** | Configurable TTL (default 30 minutes) via `ACCESS_TOKEN_EXPIRE_MINUTES` |
| **Environment secrets** | All secrets in `.env` — never hardcoded, never committed |
| **CORS** | Explicit origin allowlist + regex for wildcard domains (Vercel previews) |
| **Trusted hosts** | `TrustedHostMiddleware` blocks requests from unrecognized `Host` headers |
| **Rate limiting** | IP-based sliding window — 80 requests / 60 seconds by default |
| **Input validation** | Pydantic v2 models enforce types, lengths, and email formats on every endpoint |
| **PDF safety** | `xml.sax.saxutils.escape` sanitizes all user content before ReportLab rendering |
| **No wildcard CORS** | `allow_origins` list contains no wildcards — only `allow_origin_regex` handles patterns |

---

## Deployment

### Backend — Render or Railway

| Step | Action |
|---|---|
| 1 | Set **root directory** to `backend/` |
| 2 | **Build command:** `pip install -r requirements.txt` |
| 3 | **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| 4 | Add all environment variables from `backend/.env.example` |
| 5 | The `Procfile` is pre-configured for both platforms |

### Frontend — Vercel

| Step | Action |
|---|---|
| 1 | Set **root directory** to `frontend/` |
| 2 | **Build command:** `npm run build` |
| 3 | **Output directory:** `dist` |
| 4 | Add `VITE_API_URL` pointing to your deployed backend URL |
| 5 | `vercel.json` already includes SPA rewrite rules — no extra config needed |

> **Tip:** After deploying the backend, copy its public URL into `VITE_API_URL` in the Vercel dashboard, then redeploy the frontend.

---

## Challenges Faced

| Challenge | How It Was Solved |
|---|---|
| **AI prompt engineering** | Designed structured JSON-only prompts with explicit key names and tone guidance to ensure consistent, parseable Gemini output |
| **Gemini response parsing** | Added regex to strip accidental markdown fences from responses before `json.loads` |
| **Graceful fallbacks** | Every AI method catches all exceptions and returns deterministic, seed-based fallback data — the app never crashes |
| **CORS with wildcard origins** | Discovered that `allow_origins` does not support glob patterns — moved Vercel preview URLs to `allow_origin_regex` |
| **MongoDB cold-start** | Moved `get_db()` calls inside route handlers (not at import time) to prevent `NoneType` crashes before the lifespan connects |
| **JWT token security** | Consolidated two conflicting `SECRET_KEY` definitions; all config now reads strictly from environment variables |
| **PDF generation** | Escaped all user content through `xml.sax.saxutils.escape` before passing to ReportLab to prevent rendering errors |
| **SPA routing on Vercel** | Added `vercel.json` rewrite rule to serve `index.html` for all non-asset paths |

---

## What I Learned

| Topic | Key Takeaway |
|---|---|
| **FastAPI** | Lifespan context managers are the correct place for startup/shutdown logic — not module-level code |
| **Google Gemini API** | Structured prompts with `response_mime_type: "application/json"` produce far more reliable outputs than free-form prompts |
| **MongoDB** | Index design matters from day one — even a simple `created_at` index transforms history query performance |
| **JWT authentication** | Stateless Bearer tokens simplify deployment but require strict secret management and expiry discipline |
| **React Router v7** | All routes must be declared inside `<Routes>` — a missing wrapper silently renders nothing for child paths |
| **Pydantic v2** | `@field_validator` with `@classmethod` is the correct decorator pattern; v1-style validators raise cryptic errors |
| **Parallel async calls** | `Promise.allSettled` is the right tool for fire-and-forget enrichment — individual failures do not block the UI |
| **REST API design** | Returning consistent `{ success, data, error }` envelopes makes frontend error handling dramatically simpler |
| **Full-stack deployment** | Environment variable mismatches between frontend and backend are the most common source of production bugs |
| **AI integration patterns** | Deterministic fallbacks are not optional — they are what separates a production app from a demo |

---

## Future Roadmap

### In Progress

- [ ] User authentication UI — sign up, sign in, and per-user pitch dashboard

### Planned

- [ ] **Pitch versioning** — compare multiple iterations of the same idea side by side
- [ ] **Presentation export** — generate a PowerPoint / Google Slides deck from the pitch
- [ ] **AI pitch deck generator** — full visual slide deck with layout suggestions
- [ ] **Public pitch URLs** — one-click shareable link for each pitch report
- [ ] **AI branding assistant** — generate a startup name, tagline, and color palette
- [ ] **AI logo generator** — SVG logo concept based on the startup name and industry
- [ ] **Investor feedback mode** — simulated Q&A with a virtual investor persona
- [ ] **Team workspaces** — collaborative pitch editing with role-based access
- [ ] **Multi-language generation** — pitch output in Spanish, French, German, Arabic, and more
- [ ] **Webhook integrations** — push generated pitches to Notion, Airtable, or Slack
- [ ] **Analytics dashboard** — track score trends across pitch iterations
- [ ] **Cloud storage** — attach supporting documents, market research, and financials to each pitch

---

## Contributing

Contributions of all kinds are welcome — bug fixes, new features, documentation improvements, and design suggestions.

### How to contribute

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes, then commit with a conventional message
git commit -m "feat: add your feature description"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Open a Pull Request against main
```

### Guidelines

- Keep pull requests focused — one feature or fix per PR
- Follow the existing code style (no new linters or formatters without discussion)
- Write clear commit messages using [Conventional Commits](https://www.conventionalcommits.org/)
- Add a brief description of what changed and why in the PR body
- For large features, open an issue first to discuss the approach

### Reporting bugs

Open an issue with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your OS, Python version, and Node version

---

## Acknowledgements

This project is built on the shoulders of excellent open-source work and cloud services.

| Project / Service | Role |
|---|---|
| [Google Gemini](https://ai.google.dev) | AI engine powering all pitch generation and analysis |
| [FastAPI](https://fastapi.tiangolo.com) | High-performance Python API framework |
| [React](https://react.dev) | Frontend UI framework |
| [MongoDB Atlas](https://mongodb.com/atlas) | Cloud database for pitch and user storage |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | Animation library |
| [ReportLab](https://reportlab.com) | PDF generation library |
| [python-jose](https://github.com/mpdavis/python-jose) | JWT signing and verification |
| [passlib](https://passlib.readthedocs.io) | Password hashing |
| [Lucide](https://lucide.dev) | Icon library |
| [Vite](https://vitejs.dev) | Frontend build tool |
| The Open Source Community | For building the tools that make projects like this possible |

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Haris Ansari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
```

See the full [LICENSE](LICENSE) file for details.

---

## Author

<div align="center">

**Haris Ansari**

*Full Stack Developer · AI Engineer · Open Source Builder*

<br />

[![GitHub](https://img.shields.io/badge/GitHub-harisansari-181717?style=for-the-badge&logo=github)](https://github.com/harisansari)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-harisansari-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/harisansari)
[![Portfolio](https://img.shields.io/badge/Portfolio-harisansari.dev-000000?style=for-the-badge&logo=vercel)](https://harisansari.dev)
[![Email](https://img.shields.io/badge/Email-harisansari@email.com-EA4335?style=for-the-badge&logo=gmail)](mailto:harisansari@email.com)

</div>

---

<div align="center">

**If PitchForge AI helped you, consider giving it a ⭐ — it helps others discover the project.**

<br />

*Made with ❤️ by [Haris Ansari](https://github.com/harisansari)*

*PitchForge AI — forge the pitch before the room goes quiet.*

</div>
