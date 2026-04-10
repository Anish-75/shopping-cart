import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch products from API
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=20")
      .then((res) => {
        setProducts(res.data.products);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products. Please try again.");
        setIsLoading(false);
      });
  }, []);

  // Save cart to localStorage whenever it changes
  const syncCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Add to cart or increase quantity
  const addToCart = (product) => {
    const exists = cart.find((i) => i.id === product.id);
    syncCart(
      exists
        ? cart.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...cart, { ...product, quantity: 1 }]
    );
  };

  // Decrease quantity, remove if hits 0
  const decreaseQty = (id) => {
    syncCart(
      cart
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  // Remove item from cart entirely
  const removeFromCart = (id) => {
    syncCart(cart.filter((i) => i.id !== id));
  };

  // Derived values — no extra state needed
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);

  // Conditional rendering — loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600" />
          <p className="text-blue-600 font-semibold text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Conditional rendering — error
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-200 text-center">
          <p className="text-3xl mb-3">⚠️</p>
          <p className="text-red-600 text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 bg-clip-text text-transparent mb-2">All Products</h2>
          <p className="text-gray-600 text-lg">Explore our curated collection</p>
        </div>

        {/* Responsive grid — lists & keys */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* Conditional rendering — show cart only when open */}
      {cartOpen && (
        <CartSidebar
          cart={cart}
          total={cartTotal}
          onClose={() => setCartOpen(false)}
          onIncrease={addToCart}
          onDecrease={decreaseQty}
          onRemove={removeFromCart}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;