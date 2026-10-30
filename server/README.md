# Fitscalez — Backend API Server

Express 4 + MongoDB REST API backend for Fitscalez Agency Platform.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Seed admin user & articles
npm run seed

# Run dev server with auto-restart on http://localhost:5000
npm run dev

# Start production server
npm start
```

---

## 🔑 Environment Variables (`server/.env`)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=http://localhost:3000
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
```

---

## 📡 Endpoints

* `/health` — Health check
* `/api/v1/auth` — Admin authentication (`/login`, `/logout`, `/current-user`, `/refresh-token`)
* `/api/v1/leads` — Inquiries & CRM management (`POST /`, `GET /`, `PATCH /:id/status`, `DELETE /:id`)
* `/api/v1/analytics` — Visitor tracking (`POST /track`, `GET /stats`)
* `/api/v1/applications` — Career submissions (`POST /`, `GET /`)
* `/api/v1/blogs` — Articles (`GET /`, `GET /:slug`)

