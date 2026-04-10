import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import ProductRecommendations from "./components/ProductRecommendations";
import WishlistPage from "./components/WishlistPage";
import ProductDetailModal from "./components/ProductDetailModal";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem("recentlyViewed");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

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

  // Extract unique categories from products
  const categories = [...new Set(products.map((p) => p.category))].sort();

  // Filter products based on selected category and search term
  let filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  filteredProducts = filteredProducts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add to recently viewed
  const addToRecentlyViewed = (product) => {
    const updated = [product, ...recentlyViewed.filter((p) => p.id !== product.id)].slice(0, 5);
    setRecentlyViewed(updated);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  };

  // Toggle wishlist
  const toggleWishlist = (product) => {
    const isWishlisted = wishlist.some((p) => p.id === product.id);
    if (isWishlisted) {
      const updated = wishlist.filter((p) => p.id !== product.id);
      setWishlist(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
    } else {
      const updated = [...wishlist, product];
      setWishlist(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((p) => p.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    addToRecentlyViewed(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const openWishlist = () => {
    setView("wishlist");
  };

  const backToShop = () => {
    setView("products");
  };

  // Conditional rendering — loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300">
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-200 text-center">
          <p className="text-3xl mb-3">⚠️</p>
          <p className="text-red-600 text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300">
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={openWishlist}
        currentView={view}
      />

      {view === 'products' ? (
        <>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
            {/* Search Bar */}
            <div className="mb-6 sm:mb-8 flex flex-col items-center gap-6 sm:gap-8">
              <SearchBar
                onSearch={setSearchTerm}
                placeholder="Search products by name, description, or category..."
              />

              {recentlyViewed.length > 0 && (
                <div className="w-full bg-white/90 border border-blue-100 shadow-sm rounded-2xl sm:rounded-3xl p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Recently Viewed</h3>
                      <p className="text-gray-500 text-xs sm:text-sm">Tap a product to revisit its details.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4">
                    {recentlyViewed.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => openProductDetail(product)}
                        className="text-left bg-blue-50 rounded-xl sm:rounded-3xl p-2 sm:p-3 hover:shadow-lg transition-all"
                      >
                        <div className="overflow-hidden rounded-lg sm:rounded-2xl mb-2 sm:mb-3 h-16 sm:h-24 bg-white">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{product.title}</p>
                        <p className="text-xs sm:text-sm text-blue-600 font-bold mt-1">₹{product.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                {selectedCategory
                  ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
                  : 'All Products'}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                {searchTerm
                  ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} matching "${searchTerm}"`
                  : selectedCategory
                  ? `Showing ${filteredProducts.length} ${selectedCategory} product${filteredProducts.length !== 1 ? 's' : ''}`
                  : `Explore our curated collection of ${products.length} products`}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 mb-12">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  cart={cart}
                  wishlist={wishlist}
                  onWishlistToggle={toggleWishlist}
                  onViewDetails={openProductDetail}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <p className="text-4xl sm:text-6xl mb-2 sm:mb-3">🔍</p>
                <p className="text-gray-500 text-lg sm:text-xl font-medium">No products found</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">Try adjusting your search or filters</p>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <ProductRecommendations
                products={products.filter((p) => !filteredProducts.find((fp) => fp.id === p.id))}
                title="You Might Also Like"
                limit={5}
              />
            )}
          </main>
        </>
      ) : (
        <WishlistPage
          wishlist={wishlist}
          onAddToCart={addToCart}
          onRemoveFromWishlist={removeFromWishlist}
          onViewDetails={openProductDetail}
          onBackToShop={backToShop}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeProductDetail}
          onAddToCart={addToCart}
          onWishlistToggle={toggleWishlist}
          wishlist={wishlist}
        />
      )}

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