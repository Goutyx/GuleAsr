import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 px-4 bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="vexo-card max-w-md w-full p-8 md:p-12"
      >
        <Link to="/" className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-secondary hover:text-primary transition-colors mb-8">
          <ArrowLeft size={14} className="mr-2" /> Back Home
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tighter text-primary mb-2">WELCOME BACK</h1>
        <p className="text-secondary text-sm mb-8">Sign in to your GuleAsr account.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:border-primary text-primary transition-colors" 
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:border-primary text-primary transition-colors" 
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-secondary cursor-pointer hover:text-primary transition-colors">
              <input type="checkbox" className="mr-2 accent-primary" />
              Remember me
            </label>
            <a href="#" className="text-primary hover:underline underline-offset-4">Forgot Password?</a>
          </div>

          <button type="submit" className="vexo-btn w-full py-4 text-sm uppercase tracking-widest font-bold mt-4">
            Sign In
          </button>
        </form>
        
        <p className="text-center text-sm text-secondary mt-8">
          Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline underline-offset-4">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
