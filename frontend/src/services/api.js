import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("guleasr_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors - particularly 401 for token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only handle logout if there was a real token (not mock session)
      const hasToken = localStorage.getItem("guleasr_token");
      const hasMockSession = localStorage.getItem("guleasr_mock_session");
      
      if (hasToken) {
        // Token expired or invalid - do full logout
        localStorage.removeItem("guleasr_token");
        localStorage.removeItem("guleasr_mock_session");
        window.dispatchEvent(new CustomEvent("logout", { detail: { reason: "Token expired" } }));
        if (!window.location.pathname.includes("/login")) {
          toast.error("Session expired. Please login again.");
          window.location.href = "/login";
        }
      } else if (hasMockSession) {
        // In mock mode, just silently fail the request without logging out
        // The AuthContext will handle the fallback to mock session
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  me: () => api.get("/auth/me"),
};

export const productApi = {
  list: (params) => api.get("/products", { params }),
  getOne: (id) => api.get(`/products/${id}`),
};

export const cartApi = {
  get: () => api.get("/cart"),
  add: (productId, quantity = 1) => api.post("/cart", { productId, quantity }),
  update: (productId, quantity) => api.put(`/cart/${productId}`, { quantity }),
  remove: (productId) => api.delete(`/cart/${productId}`),
};

export const wishlistApi = {
  get: () => api.get("/wishlist"),
  toggle: (productId) => api.post("/wishlist/toggle", { productId }),
};

export const orderApi = {
  create: (payload) => api.post("/orders", payload),
  myOrders: () => api.get("/orders/my"),
};

export const paymentApi = {
  createOrder: (amount) => api.post("/payments/create-order", { amount }),
  verify: (payload) => api.post("/payments/verify", payload),
};

export const adminApi = {
  stats: () => api.get("/admin/stats"),
  users: () => api.get("/admin/users"),
  orders: () => api.get("/orders"),
  updateOrderStatus: (orderId, orderStatus) => api.put(`/orders/${orderId}`, { orderStatus }),
  createProduct: (payload) => api.post("/products", payload),
  updateProduct: (id, payload) => api.put(`/products/${id}`, payload),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default api;
