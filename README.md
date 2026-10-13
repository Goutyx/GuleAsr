# GuleAsr — Luxury Perfume E-Commerce Platform

> A modern, full-stack MERN e-commerce platform for premium perfume sales — JWT auth, Razorpay payments, an admin dashboard, and a minimalist dark UI.

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?style=flat-square&logo=mongodb)](https://www.mongodb.com/cloud/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](LICENSE)

🌐 **Live:** [guleasrluxury.vercel.app](https://guleasrluxury.vercel.app) · **API:** deployed on Render · **DB:** MongoDB Atlas

---

## About

GuleAsr is a production-deployed e-commerce platform built for luxury perfume brands. It pairs a React 19 + Vite frontend with an Express 5 + MongoDB backend, designed around three principles: **minimalist luxury aesthetic**, **secure payment processing via Razorpay**, and **a complete admin back-office** for inventory and analytics.

### What it solves
- A dedicated storefront for premium fragrance brands
- Secure online transactions with industry-standard payment integration
- Admin tools for catalog, user, and order management
- An elegant, responsive UI optimised for luxury e-commerce

### Why MERN
| Layer | Choice | Why |
|---|---|---|
| **React 19** | UI framework | Component model + hooks for clean state management |
| **Vite** | Build tool | Sub-second dev startup, modern ESM |
| **Node.js + Express 5** | Backend | Lightweight, well-suited for REST APIs |
| **MongoDB Atlas** | Database | Flexible schema for evolving product catalogs |
| **Razorpay** | Payments | India-focused, robust test + live modes, easy integration |

---

## Features

### 🛍️ Customer
- ✨ Minimalist dark-themed landing page with our-story narrative
- 🔍 Product browsing with category filtering
- 📄 Detailed product pages with notes, longevity, and recommendations
- 🛒 Cart with real-time sync to backend (race-condition-safe)
- 🔐 JWT authentication with role-based access (user / admin)
- 👤 Profile with order history
- 💳 Razorpay payments (Card / UPI) **and** Cash on Delivery
- 📦 Order tracking with status updates
- 📖 Dedicated `/our-story` brand page
- 📱 Fully responsive (mobile drawer nav, adaptive layouts)

### 👨‍💼 Admin
- 📊 Dashboard with revenue analytics (monthly bar chart)
- 📈 Live stats: revenue, orders, users, products
- 📝 Product CRUD with image upload
- 👥 User listing
- 📋 Order management with status workflow (placed → processing → shipped → delivered)
- 🔄 Payment failure tracking

### 🔒 Security
- JWT-based auth (HS256, 7-day expiry)
- bcryptjs password hashing (10 rounds)
- Role-based middleware (`protect`, `adminOnly`)
- Helmet.js HTTP security headers
- CORS allowlist for known origins
- express-validator input validation
- Mongoose schema validation (unique email, enum constraints)

---

## Tech Stack

### Frontend
| Package | Version | Purpose |
|---|---|---|
| `react` | 19.2.5 | UI framework |
| `vite` | 8 | Build tool / dev server |
| `tailwindcss` | 4.2.4 | Utility-first CSS |
| `react-router-dom` | 7.14.2 | Client-side routing |
| `axios` | 1.13.1 | HTTP client with interceptors |
| `framer-motion` | 12.38.0 | Animations |
| `recharts` | 3.4.1 | Admin analytics charts |
| `react-hot-toast` | 2.6.0 | Notifications |
| `lucide-react` | 1.14.0 | Icon set |

### Backend
| Package | Version | Purpose |
|---|---|---|
| `express` | 5.2.1 | Web framework |
| `mongoose` | 9.6.1 | MongoDB ODM |
| `jsonwebtoken` | 9.0.2 | JWT signing/verification |
| `bcryptjs` | 3.0.2 | Password hashing |
| `razorpay` | 2.9.6 | Payment gateway SDK |
| `multer` | 2.1.1 | Multipart upload (product images) |
| `helmet` | 8.1.0 | HTTP security headers |
| `cors` | 2.8.6 | Cross-origin config |
| `morgan` | 1.10.1 | Request logging |
| `express-validator` | 7.3.0 | Input validation |
| `dotenv` | 17.4.2 | Env management |
| `express-async-handler` | 1.2.0 | Async error propagation |

---

## Project Structure

```
GuleAsr/
├── frontend/                          # React + Vite SPA
│   ├── public/                        # Static assets (favicon, etc.)
│   ├── src/
│   │   ├── components/                # Reusable UI
│   │   │   ├── Navbar.jsx             # Top nav (text logo GULEASR)
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── Marquee.jsx
│   │   │   ├── Reviews.jsx
│   │   │   ├── Cart.jsx               # Slide-out cart drawer
│   │   │   ├── Footer.jsx
│   │   │   ├── BannerSection.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── free.jsx
│   │   ├── pages/                     # Route components
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── OurStory.jsx           # /our-story brand page
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # JWT session + login/register/logout
│   │   │   └── CartContext.jsx        # Cart state, sync to backend
│   │   ├── services/
│   │   │   └── api.js                 # Axios instance + API helpers
│   │   ├── data/                      # Fallback product data
│   │   ├── utils/                     # currency, helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── backend/                           # Express 5 REST API
│   ├── config/
│   │   └── db.js                      # MongoDB connection
│   ├── models/                        # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── adminRoutes.js
│   │   └── uploadRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js          # protect + adminOnly
│   │   ├── errorMiddleware.js         # notFound + errorHandler
│   │   └── uploadMiddleware.js        # multer config
│   ├── scripts/
│   │   ├── seedProducts.js            # `npm run seed:products`
│   │   └── createAdmin.js             # `npm run seed:admin`
│   ├── uploads/                       # Product image storage
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB Atlas cluster **or** local MongoDB
- Razorpay test keys (free — [dashboard.razorpay.com](https://dashboard.razorpay.com))

### 1. Clone & install
```bash
git clone https://github.com/Goutyx/GuleAsr.git
cd GuleAsr
```

### 2. Backend
```bash
cd backend
cp .env.example .env       # fill in MONGO_URI, JWT_SECRET, RAZORPAY_*
npm install
npm run seed:products      # populate catalog
npm run seed:admin         # create admin@guleasr.com / adminpassword123
npm run dev                # http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
cp .env.example .env       # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                # http://localhost:5173
```

### 4. Test the app
- **Admin login:** `admin@guleasr.com` / `adminpassword123`
- **Test Razorpay card:** `4111 1111 1111 1111`, any future expiry, any CVV
- **COD orders** work without a payment gateway

---

## API Reference

All routes are prefixed with `/api`. Auth routes are public; everything else requires a `Bearer` token in the `Authorization` header.

### Auth
| Method | Path | Body | Auth | Description |
|---|---|---|---|---|
| `POST` | `/auth/register` | `{ name, email, password }` | — | Register new user |
| `POST` | `/auth/login` | `{ email, password }` | — | Login → returns `{ token, user }` |
| `GET` | `/auth/me` | — | ✅ | Get current user |

**Login error responses**
- `400` — Invalid email format / missing fields
- `404` — No account found with that email
- `401` — Incorrect password

### Products
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/products` | — | List all products |
| `GET` | `/products/:id` | — | Get product by ID |
| `POST` | `/products` | admin | Create product |
| `PUT` | `/products/:id` | admin | Update product |
| `DELETE` | `/products/:id` | admin | Delete product |

### Cart
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/cart` | ✅ | Get current user's cart |
| `POST` | `/cart` | ✅ | Add item `{ productId, quantity }` |
| `PUT` | `/cart/:productId` | ✅ | Update quantity `{ quantity }` |
| `DELETE` | `/cart/:productId` | ✅ | Remove item |

### Orders
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/orders` | ✅ | Create order from current cart |
| `GET` | `/orders/my` | ✅ | Get current user's orders |
| `GET` | `/orders` | admin | Get all orders |
| `PUT` | `/orders/:id` | admin | Update order status |

### Payments
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/payments/create-order` | ✅ | Create Razorpay order `{ amount }` |
| `POST` | `/payments/verify` | ✅ | Verify payment + mark order paid |
| `POST` | `/payments/failed` | ✅ | Mark order as payment failed (cancelled) |

### Admin
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/admin/stats` | admin | Dashboard stats (revenue, monthly) |
| `GET` | `/admin/users` | admin | List all users |

### Uploads
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/upload` | admin | Upload product image (multipart) |

---

## Payment Flow

The checkout integrates Razorpay with a server-side order-first pattern (more reliable than client-side order creation):

1. **Create Razorpay order** — `POST /payments/create-order` returns a `razorpay_order_id`
2. **Pre-create our order** — `POST /orders` with `paymentStatus: "pending"` and the `razorpayOrderId` set
3. **Open Razorpay checkout** — user completes payment
4. **On success** — Razorpay's `handler` calls `POST /payments/verify` which validates the HMAC signature and updates the order's `paymentStatus` to `"paid"`
5. **On cancel** — Razorpay's `modal.ondismiss` calls `POST /payments/failed` which marks the order as `"failed"`

For COD, the order is created directly with `paymentStatus: "pending"` and awaits fulfillment.

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Example |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/guleasr` |
| `JWT_SECRET` | JWT signing secret (≥ 32 chars) | random 64-char hex |
| `PORT` | Server port | `5000` |
| `CLIENT_URL` | Allowed CORS origin | `https://guleasrluxury.vercel.app` |
| `RAZORPAY_KEY_ID` | Razorpay API key | `rzp_test_xxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay secret | (from dashboard) |
| `NODE_ENV` | Environment | `development` \| `production` |

### Frontend (`frontend/.env`)
| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base | `http://localhost:5000/api` |

---

## Deployment

| Service | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |

### Production deploy checklist
- [ ] MongoDB Atlas cluster created with strong DB user password
- [ ] Atlas **Network Access** restricted to your deployment IPs (not `0.0.0.0/0`)
- [ ] `JWT_SECRET` regenerated (≥ 32 random chars)
- [ ] Razorpay **live** keys in production env (not test keys)
- [ ] CORS `CLIENT_URL` set to the deployed frontend URL
- [ ] `NODE_ENV=production` on the backend

---

## Scripts

### Backend
| Script | Purpose |
|---|---|
| `npm start` | Production start (`node server.js`) |
| `npm run dev` | Dev start (same command, no watcher) |
| `npm run seed:products` | Seed product catalog from `data/` |
| `npm run seed:admin` | Create/promote the admin user |

### Frontend
| Script | Purpose |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production bundle to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint check |

---

## Changelog

### Recent
- **Refactored payment flow** — orders are now pre-created with `paymentStatus: "pending"` + `razorpayOrderId`; verify endpoint updates to `"paid"`. Eliminates the race where the order didn't exist at verify time
- **Removed wishlist feature** — model, controller, routes, and all frontend references gone
- **Stricter login validation** — distinguishes "no account" (`404`) from "wrong password" (`401`); rejects obviously-fake email formats (e.g. `a@b.com`)
- **Logo → text** — replaced the navbar image logo with a minimalist bold "GULEASR" wordmark
- **New `/our-story` page** — brand narrative page linked from the navbar and footer
- **Bug fix: validation status code** — `errorMiddleware` now reads `err.statusCode` so validation errors return `400` instead of `500`
- **Bug fix: cart race condition** — `addToCart` now `await`s the backend call before claiming success
- **Cleanup** — removed dead `routes/api.js` mock endpoint and unused mock-auth constants
- **Added `start` script** to backend `package.json` (was missing; broke `npm start` on Render)

---

## Contributing

Pull requests welcome. For major changes, please open an issue first.

```bash
git checkout -b feature/your-feature
git commit -m "feat: your change"
git push origin feature/your-feature
```

---

## License

Proprietary — © GuleAsr. All rights reserved.

---

<div align="center">

Built for luxury fragrance enthusiasts.

[Report Bug](https://github.com/Goutyx/GuleAsr/issues) · [Request Feature](https://github.com/Goutyx/GuleAsr/issues)

</div>
