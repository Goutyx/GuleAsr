import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";
import { adminApi, productApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { formatINR } from "../utils/currency";

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: "", category: "Floral", type: "perfume", price: 2500, description: "", imageFile: null, imagePreview: null, stock: 10 });
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, and WebP images are allowed");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((s) => ({
        ...s,
        imageFile: file,
        imagePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = async () => {
    if (!form.name || !form.imageFile) {
      toast.error("Please fill in all fields and select an image");
      return;
    }

    try {
      setUploading(true);
      // Upload image first
      const { data } = await adminApi.uploadImage(form.imageFile);
      const imageUrl = data.imageUrl;

      // Create product with uploaded image
      await adminApi.createProduct({
        name: form.name,
        category: form.category,
        type: form.type,
        price: form.price,
        description: form.description,
        images: [imageUrl],
        stock: form.stock,
        notes: [],
      });

      toast.success("Product added successfully!");
      setForm({ name: "", category: "Floral", type: "perfume", price: 2500, description: "", imageFile: null, imagePreview: null, stock: 10 });
      refresh();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add product");
    } finally {
      setUploading(false);
    }
  };

  const refresh = () => {
    adminApi.stats().then(({ data }) => setStats(data)).catch(() => setStats(null));
    adminApi.users().then(({ data }) => setUsers(data)).catch(() => setUsers([]));
    productApi.list().then(({ data }) => setProducts(data)).catch(() => setProducts([]));
    adminApi.orders().then(({ data }) => setOrders(data)).catch(() => setOrders([]));
  };

  useEffect(() => {
    if (!isAdmin) return;
    refresh();
  }, [isAdmin]);

  if (!isAdmin) return <div className="pt-32 text-center text-secondary">Admin access required.</div>;

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-325 mx-auto min-h-screen">
      <h1 className="text-5xl font-bold tracking-tighter text-primary mb-8">ADMIN DASHBOARD</h1>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="vexo-card p-5"><p className="text-secondary">Revenue</p><p className="text-primary font-bold text-2xl">{formatINR(stats?.revenue || 0)}</p></div>
        <div className="vexo-card p-5"><p className="text-secondary">Orders</p><p className="text-primary font-bold text-2xl">{stats?.orders || 0}</p></div>
        <div className="vexo-card p-5"><p className="text-secondary">Users</p><p className="text-primary font-bold text-2xl">{stats?.users || 0}</p></div>
        <div className="vexo-card p-5"><p className="text-secondary">Products</p><p className="text-primary font-bold text-2xl">{stats?.products || 0}</p></div>
      </div>

      <div className="vexo-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-secondary/20">
                <th className="text-left p-3 text-secondary">Order ID</th>
                <th className="text-left p-3 text-secondary">Customer</th>
                <th className="text-left p-3 text-secondary">Products</th>
                <th className="text-left p-3 text-secondary">Total</th>
                <th className="text-left p-3 text-secondary">Order Status</th>
                <th className="text-left p-3 text-secondary">Payment</th>
                <th className="text-left p-3 text-secondary">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b border-secondary/10 hover:bg-secondary/5">
                    <td className="p-3 text-secondary">{order._id.slice(-6)}</td>
                    <td className="p-3 text-secondary text-xs">
                      <div>{order.user?.name || "N/A"}</div>
                      <div className="text-secondary/60">{order.user?.email || ""}</div>
                    </td>
                    <td className="p-3 text-secondary text-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx}>{item.name} x{item.quantity}</div>
                      ))}
                    </td>
                    <td className="p-3 text-secondary font-semibold">{formatINR(order.totalAmount)}</td>
                    <td className="p-3">
                      <select
                        value={order.orderStatus}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          try {
                            await adminApi.updateOrderStatus(order._id, newStatus);
                            toast.success(`Order status updated to ${newStatus}!`);
                            refresh();
                          } catch (error) {
                            toast.error(error.response?.data?.message || "Failed to update status");
                          }
                        }}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold bg-background border cursor-pointer ${
                          order.orderStatus === 'delivered' ? 'border-green-500/50 text-green-400' :
                          order.orderStatus === 'shipped' ? 'border-blue-500/50 text-blue-400' :
                          order.orderStatus === 'processing' ? 'border-yellow-500/50 text-yellow-400' :
                          'border-gray-500/50 text-gray-400'
                        }`}
                      >
                        <option value="placed">placed</option>
                        <option value="processing">processing</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        order.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-400' :
                        order.paymentStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3 text-secondary text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-secondary">No orders yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="vexo-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Revenue Analytics</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats?.monthlyRevenue || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#967D6A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="vexo-card p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Users</h2>
          <div className="space-y-2 max-h-80 overflow-auto">
            {users.map((user) => <div key={user._id} className="border border-secondary/20 rounded-xl p-3 text-secondary">{user.name} - {user.email}</div>)}
          </div>
        </div>
        <div className="vexo-card p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Inventory</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <input value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} placeholder="Product name" className="col-span-2 p-2 bg-background border border-secondary/20 rounded-xl" />
            <select value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))} className="p-2 bg-background border border-secondary/20 rounded-xl">
              {["Floral", "Woody", "Fresh", "Oriental", "Citrus"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={form.type} onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))} className="p-2 bg-background border border-secondary/20 rounded-xl">
              <option value="perfume">perfume</option>
              <option value="oil">oil</option>
            </select>
            <input value={form.price} type="number" onChange={(e) => setForm((s) => ({ ...s, price: Number(e.target.value) }))} placeholder="Price" className="p-2 bg-background border border-secondary/20 rounded-xl" />
            <input value={form.stock} type="number" onChange={(e) => setForm((s) => ({ ...s, stock: Number(e.target.value) }))} placeholder="Stock" className="p-2 bg-background border border-secondary/20 rounded-xl" />
            <label htmlFor="image-input" className="col-span-2 p-2 bg-background border border-secondary/20 rounded-xl cursor-pointer text-secondary hover:bg-secondary/10 transition">
              {form.imagePreview ? "✓ Image selected" : "Click to select image"}
            </label>
            <input id="image-input" type="file" onChange={handleImageChange} accept="image/jpeg,image/png,image/webp" className="hidden" />
            {form.imagePreview && (
              <div className="col-span-2 relative rounded-xl overflow-hidden border border-secondary/20">
                <img src={form.imagePreview} alt="Preview" className="w-full h-48 object-cover" />
              </div>
            )}
            <textarea value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} placeholder="Description" className="col-span-2 p-2 bg-background border border-secondary/20 rounded-xl" />
            <button
              onClick={handleAddProduct}
              disabled={uploading}
              className="col-span-2 p-2 rounded-xl bg-primary text-background disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Add Product"}
            </button>
          </div>
          <div className="space-y-2 max-h-80 overflow-auto">
            {products.map((product) => (
              <div key={product._id} className="border border-secondary/20 rounded-xl p-3 text-secondary flex justify-between">
                <span>{product.name} - Stock {product.stock}</span>
                <button onClick={async () => { await adminApi.deleteProduct(product._id); refresh(); }} className="text-red-400">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
