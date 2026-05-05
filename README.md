# GuleAsr - Premium Perfume MERN E-Commerce

Production-style full-stack MERN application for a luxury perfume brand with modern dark UI, authentication, cart/checkout, wishlist, orders, admin dashboard, and Razorpay payment flow.

## Folder Structure

```text
GULEASR/
  frontend/
    src/
      components/
      context/
      pages/
      services/
      utils/
    .env.example
  backend/
    config/
    controllers/
    data/
    middleware/
    models/
    routes/
    scripts/
    utils/
    .env.example
  README.md
```

## Features

- **Frontend (React + Vite + Tailwind):**
  - Existing luxury landing page preserved
  - Product listing with filters/sort
  - Product detail, cart drawer, wishlist
  - Login/register, profile page, checkout flow
  - Razorpay checkout integration
  - Admin dashboard with analytics chart
- **Backend (Node.js + Express + MongoDB):**
  - JWT auth + role-based authorization
  - MVC structure with reusable middleware
  - Product CRUD (admin only for write ops)
  - Cart, wishlist, orders APIs
  - Razorpay create-order + signature verification APIs
  - Admin stats/users APIs

## API Modules

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `GET /api/products/:id`
- `POST|PUT|DELETE /api/products/:id?` (admin)
- `GET|POST /api/cart`
- `PUT|DELETE /api/cart/:productId`
- `GET|POST /api/wishlist` / `wishlist/toggle`
- `POST /api/orders`, `GET /api/orders/my`, `GET /api/orders` (admin)
- `POST /api/payments/create-order`
- `POST /api/payments/verify`
- `GET /api/admin/stats`, `GET /api/admin/users`

## Setup Instructions

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
```

Set real values for:
- `MONGO_URI`
- `JWT_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

Run backend:

```bash
npm run dev
```

Seed products (optional):

```bash
npm run seed:products
```

### 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Dummy Product Data

- Seed script creates **25 products** with a 20 perfumes / 5 oils pattern.
- Base curated samples live in `backend/data/products.js`.

## Deployment

- Frontend: Vercel
- Backend: Render or Railway
- Database: MongoDB Atlas

Set environment variables in deployment platform exactly as `.env.example`.
