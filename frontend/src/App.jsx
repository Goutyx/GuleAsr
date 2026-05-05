import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-background min-h-screen font-inter text-primary flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <Cart />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
