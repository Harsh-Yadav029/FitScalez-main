# Fitscalez — Full-Stack Agency Platform 

> **An agency built for the future. From MERN to Marketing.**  
> A high-performance digital agency platform combining an Awwward-caliber motion-designed frontend with an enterprise-ready Express + MongoDB backend, Lead Management CRM, Live Visitor Analytics, Career Applications, and a 14-Article SEO Knowledge Base.

---

## ⚡ Overview

**Fitscalez** is a full-stack digital agency based in Civil Lines, Delhi, India, delivering bespoke MERN Stack web platforms, Technical SEO dominance, and high-ROI performance marketing. 

The codebase is organized as a clean **monorepo**:
* **`client/`**: Next.js 15 + React 19 frontend with advanced GSAP physics, Lenis smooth scrolling, and custom modular CSS.
* **`server/`**: Standalone Express 4 + MongoDB (Mongoose) REST API with JWT authentication via secure `HttpOnly` cookies, CORS origin filtering, and reverse proxy trust.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend Framework** | **Next.js 15.2.8** | App Router, React 19.0.0, dynamic routing, static site generation |
| **Animation Engine** | **GSAP 3.12.5** | ScrollTrigger, InertiaPlugin, quickTo mouse tracking, elastic easings |
| **Smooth Scrolling** | **Lenis 1.1.14** | Physics-based inertia scroll synchronized with GSAP ticker |
| **Styling** | **Vanilla CSS Variables** | 12+ modular partial stylesheets; zero Tailwind lock-in |
| **Backend Runtime** | **Node.js (ESM)** | Express 4.21.2 (`"type": "module"`) |
| **Database & ODM** | **MongoDB & Mongoose 8.9.5** | Indexed schemas, automated pre-save password hashing, fallback degraded mode |
| **Authentication** | **JWT & bcryptjs** | Short-lived Access Tokens + long-lived Refresh Tokens in `HttpOnly` cookies |
| **Client HTTP** | **Native Fetch API** | Lightweight client in `client/lib/api.js` with credentials support |

---

## 📁 Monorepo Structure

```text
FitScalez-main/
├── client/                              # ─── Frontend Next.js Application ───
│   ├── app/
│   │   ├── page.jsx                     # Homepage assembling all interactive sections
│   │   ├── layout.jsx                   # Root layout, metadata & fonts
│   │   ├── globals.css                  # Master CSS entry point
│   │   ├── about/page.jsx               # Agency story, leadership team, milestones
│   │   ├── services/page.jsx            # Core capabilities & 3 pricing packages
│   │   ├── projects/page.jsx            # Filterable case study portfolio
│   │   ├── blog/
│   │   │   ├── page.jsx                 # Searchable 14-article knowledge base
│   │   │   └── [slug]/page.jsx          # Dynamic reading page with Table of Contents
│   │   ├── careers/page.jsx             # Job listings & application form
│   │   ├── contact/page.jsx             # Lead capture form with budget range selector
│   │   ├── privacy-policy/page.jsx      # DPDP Act & GDPR compliant privacy policy
│   │   ├── terms-of-service/page.jsx    # Service agreement & legal terms
│   │   ├── sitemap/page.jsx             # Visual HTML sitemap
│   │   ├── sitemap.js                   # Dynamic /sitemap.xml metadata generator
│   │   ├── admin/
│   │   │   ├── login/page.jsx           # Secure admin sign-in
│   │   │   └── dashboard/page.jsx       # CRM lead manager, status updates & analytics
│   │   └── styles/                      # 12 Modular CSS partials
│   ├── components/                      # Reusable React & GSAP components
│   │   ├── Navbar.jsx                   # Sticky navbar, theme transitions & full-screen menu
│   │   ├── VimeoHero.jsx                # Video hero, sound-toggle mute bubble & headline
│   │   ├── TrustedClientsMarquee.jsx    # Continuous horizontal ticker of Indian client brands
│   │   ├── HorizontalWords.jsx          # Pinned scroll with character & sticker elastic bounce
│   │   ├── MotionCards.jsx              # GSAP InertiaPlugin mouse fling & snap-back cards
│   │   ├── Showreel.jsx                 # Video production showcase placeholder
│   │   ├── ServiceCards.jsx             # Horizontal fan-out accordion cards on hover
│   │   ├── Footer.jsx                   # Cursor proximity push stickers, credits & legal links
│   │   ├── CursorBubble.jsx             # Custom context-aware GSAP cursor follower
│   │   ├── SmoothScroll.jsx             # Lenis initialization & tab title toggle
│   │   ├── SvgSymbols.jsx               # Shared SVG symbols
│   │   └── TransitionScribble.jsx       # Fullscreen GSAP SVG scribble mask transition
│   ├── lib/
│   │   ├── api.js                       # Centralized fetch API client
│   │   ├── articles.json                # 14 complete technical guides & articles
│   │   └── data.js                      # Agency info, case studies, pricing & configs
│   ├── public/                          # Brand logos, stickers, cursors & variable fonts
│   ├── jsconfig.json                    # @/* path mapping
│   ├── next.config.mjs                  # Next.js build configuration
│   └── package.json                     # Frontend dependencies
│
├── server/                              # ─── Backend Express + MongoDB API ───
│   ├── src/
│   │   ├── controllers/                 # auth, leads, analytics, applications, blogs
│   │   ├── models/                      # User, Lead, Application, Visitor, Blog schemas
│   │   ├── routes/                      # REST routes under /api/v1/
│   │   ├── middlewares/                 # verifyJWT auth guard
│   │   ├── utils/                       # ApiError, ApiResponse, asyncHandler
│   │   ├── db/index.js                  # Mongoose connector with public DNS fallback
│   │   ├── app.js                       # Express app, CORS & trust proxy configuration
│   │   ├── index.js                     # Server entry point (default port 5000/8000)
│   │   └── seed.js                      # Admin user creation & MongoDB blog seeder
│   ├── .env.example                     # Backend environment template
│   └── package.json                     # Server dependencies
│
├── .gitignore                           # Monorepo gitignore rules
├── .env.example                         # Root/Frontend environment template
├── render.yaml                          # Render Blueprint specification
├── package.json                         # Root convenience workspace scripts
└── README.md
```

---

## 🎨 Interactive Animations & Motion Design

* **GSAP InertiaPlugin Fling**: Motion cards and floating tags calculate pointer velocity; on mouse release, elements fling outward with realistic momentum and snap back elastically.
* **Horizontal Pin & Letter Bounce**: Pinned viewport section that translates text horizontally while triggering elastic vertical bounces on characters and stickers.
* **Service Card Fan-Out**: Five service deck cards expand horizontally on hover using GSAP elastic physics with hovered card zoom.
* **Trusted Clients Marquee**: Continuous, hardware-accelerated horizontal brand ticker displaying partner client badges with edge-fade gradient masks and pause-on-hover.
* **Proximity Sticker Push**: Footer sticker badges react to rapid cursor movements with displacement proportional to velocity before springing back.
* **Fullscreen Transition Scribble**: SVG mask animation that draws over the viewport on logo click, selects a randomized theme color, and scrolls to top.
* **Contextual Cursor Bubble**: Spring-damped cursor follower with text state switching (`view`, `click`, `drag`).
* **Dynamic Tab Title**: Changes browser tab title to `"Hey, over here! 👀"` when visibility changes.

---

## 🌐 API Endpoints Reference

Base URL: `http://localhost:5000/api/v1` (or your live Render URL + `/api/v1`)

### 1. Authentication (`/api/v1/auth`)
* `POST /login` — Authenticate admin; sets `HttpOnly` JWT access/refresh cookies.
* `POST /logout` — Invalidate session and clear auth cookies.
* `POST /refresh-token` — Issue a new access token via refresh token.
* `GET /current-user` — Retrieve current authenticated user profile *(Protected)*.

### 2. Leads CRM (`/api/v1/leads`)
* `POST /` — Public endpoint to submit client consultation inquiry.
* `GET /` — Fetch all inquiries with optional status filter (`new`, `contacted`, `in-progress`, `closed`) *(Protected)*.
* `PATCH /:id/status` — Update inquiry status or internal follow-up notes *(Protected)*.
* `DELETE /:id` — Delete inquiry record *(Protected)*.

### 3. Analytics & Tracking (`/api/v1/analytics`)
* `POST /track` — Ingest visitor device ID, browser, OS, city/country, referrer, and dwell time.
* `GET /stats` — Retrieve aggregate KPI metrics for dashboard cards *(Protected)*.

### 4. Career Applications (`/api/v1/applications`)
* `POST /` — Public endpoint to submit job application, resume link, and portfolio.
* `GET /` — List received applications *(Protected)*.

### 5. Blogs (`/api/v1/blogs`)
* `GET /` — Retrieve all published blog articles.
* `GET /:slug` — Retrieve single blog article by slug.

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js** v18+ installed
* **MongoDB** connection string (local or MongoDB Atlas)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Harsh-Yadav029/FitScalez-main.git
cd FitScalez-main

# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server && npm install
cd ..
```

### 2. Environment Variables

Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000
ACCESS_TOKEN_SECRET=your_super_secret_access_key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
REFRESH_TOKEN_EXPIRY=10d
```

Create `client/.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Seed Database
Initialize default admin credentials (`admin` / `adminpassword123`) and import 14 SEO articles:
```bash
npm run seed
# or: cd server && npm run seed
```

### 4. Run Development Servers
From the root directory:
```bash
# Run Next.js frontend (http://localhost:3000)
npm run dev

# Run Express backend in a second terminal (http://localhost:5000)
npm run dev:server
```

---

## ☁️ Deployment Guide

### Deploy Backend on Render
1. Create a **New Web Service** connected to your repository on [Render](https://dashboard.render.com).
2. Configure settings:
   * **Root Directory**: `server`
   * **Build Command**: `npm install`
   * **Start Command**: `node src/index.js`
   * **Health Check Path**: `/health`
3. Add Environment Variables:
   * `NODE_ENV`: `production`
   * `PORT`: `10000`
   * `MONGODB_URI`: *Your MongoDB Atlas connection URI*
   * `CORS_ORIGIN`: `https://*.vercel.app,http://localhost:3000`
   * `ACCESS_TOKEN_SECRET`: *Random secure string*
   * `ACCESS_TOKEN_EXPIRY`: `1d`
   * `REFRESH_TOKEN_SECRET`: *Random secure string*
   * `REFRESH_TOKEN_EXPIRY`: `10d`
4. Deploy and copy your service URL (e.g., `https://fitscalez-server.onrender.com`).

### Deploy Frontend on Vercel
1. Import repository on [Vercel](https://vercel.com/new).
2. Configure settings:
   * **Framework Preset**: `Next.js` *(Auto-detected)*
   * **Root Directory**: `client` ⚠️ *(Click "Edit" and choose `client`)*
   * **Build Command**: `next build`
3. Add Environment Variables:
   * `NEXT_PUBLIC_API_URL`: `https://fitscalez-server.onrender.com/api/v1` *(Your live Render URL + `/api/v1`)*
   * `NEXT_PUBLIC_SITE_URL`: `https://your-domain.vercel.app`
4. Click **Deploy**. All 30 routes will build automatically.

---

## 👥 Leadership Team & Agency Info

* **Fitscalez Agency**: 24, Shri Ram Road, Civil Lines, Delhi – 110054, India
* **Hariom Saini** — *Founder & CEO*: Directs corporate partnerships, agency growth, and business expansion.
* **Divyansh** — *Lead Web Developer*: Architecture of the full-stack MERN platform, GSAP animation engine, and Next.js applications.
* **Ms. Anshul Sharma** — *Partner & Strategy Director*: Oversees brand positioning, performance advertising, and organic search campaigns.

## 📄 License & Credits
© 2024 Fitscalez. All rights reserved.
Built for high-scale digital performance.
