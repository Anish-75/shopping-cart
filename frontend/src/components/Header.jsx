function Header({ cartCount, onCartClick }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-8 py-5 flex justify-between items-center shadow-lg sticky top-0 z-40">
      <h1 className="text-3xl font-bold tracking-tight font-sans">🛒 ShopCart</h1>

      <button
        onClick={onCartClick}
        className="relative bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-200 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 border border-white/30"
      >
        <span>🛍️</span>
        Cart
        {/* Badge — conditional rendering */}
        {cartCount > 0 && (
          <span className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}

export default Header;