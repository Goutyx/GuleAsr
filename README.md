# 🌸 GuleAsr - Luxury Perfume E-Commerce Platform

> A modern, full-stack MERN e-commerce application for premium perfume sales with JWT authentication, payment integration, admin dashboard, and an elegant dark UI.

![React](https://img.shields.io/badge/React-19.2.5-61dafb?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-47a248?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06b6d4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## About

GuleAsr is a full-featured e-commerce platform designed specifically for premium perfume sales. Built with the MERN stack, it combines a modern React frontend with a robust Express backend, offering a seamless shopping experience with features like real-time cart management, secure payment processing via Razorpay, and a comprehensive admin dashboard for inventory and sales analytics.

### What Problem Does It Solve?

- Provides a dedicated platform for luxury perfume brands to showcase and sell products online
- Enables secure transactions with industry-standard payment integration
- Offers admin tools for inventory and sales management
- Delivers an elegant, responsive user experience optimized for luxury e-commerce

### Why MERN Stack?

- **React**: Fast, component-based UI with excellent state management
- **Node.js/Express**: Lightweight, scalable backend perfect for REST APIs
- **MongoDB**: Flexible NoSQL database ideal for product catalogs
- **Vite**: Lightning-fast development and build tool

## Features

### 🛍️ Customer Features
- ✨ Premium dark-themed luxury landing page
- 🔍 Product browsing with filtering and sorting
- 📄 Detailed product information pages
- ❤️ Wishlist management (add/remove favorites)
- 🛒 Shopping cart with real-time updates
- 🔐 User authentication (Register/Login)
- 👤 User profile management
- 💳 Secure Razorpay payment integration
- 📦 Order tracking and history
- 📱 Fully responsive design

### 👨‍💼 Admin Features
- 📊 Dashboard with sales analytics and charts
- 📈 Real-time statistics (revenue, orders, customers)
- 📝 Product management (Create, Read, Update, Delete)
- 👥 User management
- 📋 Order management and fulfillment tracking
- 🖼️ Image upload for products

### 🔒 Security Features
- JWT-based authentication
- Role-based access control (User/Admin)
- Password hashing with bcryptjs
- CORS configuration for security
- Helmet.js for HTTP security headers
- Request validation with express-validator

## Tech Stack

### Frontend
- **React 19.2.5** - UI framework
- **Vite 8** - Build tool and dev server
- **Tailwind CSS 4.2.4** - Utility-first CSS framework
- **React Router 7.14.2** - Client-side routing
- **Axios 1.13.1** - HTTP client
- **Framer Motion 12.38.0** - Animation library
- **Recharts 3.4.1** - Data visualization
- **React Hot Toast 2.6.0** - Notifications
- **Lucide React 1.14.0** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express 5.2.1** - Web framework
- **MongoDB 9.6.1** - NoSQL database
- **JWT** - Authentication tokens
- **bcryptjs 3.0.2** - Password hashing
- **Multer 2.1.1** - File upload handling
- **Razorpay 2.9.6** - Payment processing
- **Helmet 8.1.0** - Security middleware
- **Morgan 1.10.1** - Request logging
- **Dotenv 17.4.2** - Environment management

### DevTools
- ESLint - Code linting
- PostCSS - CSS transformation
- Autoprefixer - Browser compatibility

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB** (local or Atlas account) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Razorpay Account** - [Create Account](https://razorpay.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Goutyx/GuleAsr.git
cd GuleAsr
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials (see Environment Variables section)
```

**Configure your `.env` file:**
```
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/guleasr
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
PORT=5000
CLIENT_URL=http://localhost:5173
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 3. Seed Initial Products (Optional)

```bash
# From the backend directory
npm run seed:products
```

This creates 25 sample products (20 perfumes, 5 oils) in your database.

### 4. Start Backend Server

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 5. Frontend Setup

```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure .env file (example below)
```

**Configure your `.env` file:**
```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=GuleAsr
```

### 6. Start Frontend Development Server

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Project Structure

```
GuleAsr/
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/             # React Context (Auth, Cart)
│   │   ├── services/            # API calls (axios instance)
│   │   ├── utils/               # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                  # Static assets
│   ├── .env.example
│   └── package.json
│
├── backend/                     # Express.js API
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── Wishlist.js
│   ├── routes/                  # API route handlers
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── adminRoutes.js
│   │   └── uploadRoutes.js
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   └── ...
│   ├── middleware/              # Custom middleware
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js  # Multer config
│   ├── scripts/                 # Utility scripts
│   │   ├── seedProducts.js
│   │   └── createAdmin.js
│   ├── data/                    # Seed data
│   │   └── products.js
│   ├── uploads/                 # Product images storage
│   ├── .env.example
│   ├── server.js                # Entry point
│   └── package.json
│
└── README.md                    # This file
```

## Usage

### For Customers

1. **Browse Products**
   - Visit the home page to see featured products
   - Navigate to Shop page for all products
   - Use filters and sorting options

2. **Add to Cart**
   - Click "Add to Cart" on any product
   - View cart using the shopping cart icon
   - Adjust quantities or remove items

3. **Create Account**
   - Click "Register" to create a new account
   - Fill in email and password
   - Verify your email (if configured)

4. **Checkout & Payment**
   - Go to cart and click "Checkout"
   - Enter shipping and billing details
   - Select payment method (Razorpay)
   - Complete payment securely

5. **Manage Wishlist**
   - Click the heart icon to add products to wishlist
   - View wishlist from the menu
   - Add wishlist items to cart

6. **View Orders**
   - Go to your profile
   - Check order history
   - View order details and status

### For Admins

1. **Access Admin Dashboard**
   - Log in with admin account
   - Navigate to Admin Dashboard from menu

2. **View Analytics**
   - Check revenue, orders, and customer stats
   - View sales trends with charts

3. **Manage Products**
   - Add new products with images
   - Edit existing product details
   - Delete products
   - Upload product images

4. **Manage Users**
   - View all registered users
   - Monitor user activity

5. **Manage Orders**
   - View all orders
   - Update order status
   - Process refunds

## API Endpoints

### Authentication
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
GET    /api/auth/me              - Get current user (Protected)
```

### Products
```
GET    /api/products             - Get all products
GET    /api/products/:id         - Get product by ID
POST   /api/products             - Create product (Admin only)
PUT    /api/products/:id         - Update product (Admin only)
DELETE /api/products/:id         - Delete product (Admin only)
```

### Cart
```
GET    /api/cart                 - Get user's cart
POST   /api/cart                 - Add item to cart
PUT    /api/cart/:productId      - Update cart item
DELETE /api/cart/:productId      - Remove from cart
```

### Wishlist
```
GET    /api/wishlist             - Get user's wishlist
POST   /api/wishlist/toggle      - Toggle product in wishlist
```

### Orders
```
POST   /api/orders               - Create order
GET    /api/orders/my            - Get user's orders
GET    /api/orders               - Get all orders (Admin only)
PUT    /api/orders/:id           - Update order status (Admin only)
```

### Payments
```
POST   /api/payments/create-order   - Create Razorpay order
POST   /api/payments/verify         - Verify payment signature
```

### Admin
```
GET    /api/admin/stats          - Get dashboard stats (Admin only)
GET    /api/admin/users          - Get all users (Admin only)
```

### Uploads
```
POST   /api/uploads              - Upload product image (Admin only)
```

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/guleasr` |
| `JWT_SECRET` | Secret key for JWT tokens (min 32 chars) | `your_secret_key_here_min_32_chars` |
| `PORT` | Backend server port | `5000` |
| `CLIENT_URL` | Frontend URL | `http://localhost:5173` |
| `RAZORPAY_KEY_ID` | Razorpay API key | `rzp_test_xxxxxxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay API secret | `xxxxxxxxxxxxxxxx` |
| `NODE_ENV` | Environment | `development` or `production` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |
| `VITE_APP_NAME` | Application name | `GuleAsr` |

## Deployment

### Frontend is deployed on Vercel

### Backend is deployed on Render

### Database is deployed on MongoDB Atlas



## Contributing

We welcome contributions! To contribute:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/GuleAsr.git
   cd GuleAsr
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic

4. **Test your changes**
   - Test locally before pushing
   - Test on different browsers/devices

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Include screenshots if UI changes



<div align="center">

**Made with ❤️ for luxury perfume enthusiasts**

[Report Bug](https://github.com/Goutyx/GuleAsr/issues) • [Request Feature](https://github.com/Goutyx/GuleAsr/issues) • [Documentation](https://github.com/Goutyx/GuleAsr/wiki)

</div>
