function Header({ cartCount, onCartClick, wishlistCount, onWishlistClick, currentView }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shadow-lg sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight font-sans">🛒 ShopCart</h1>
        <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white">{currentView === 'wishlist' ? 'Wishlist' : 'Shop'}</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onWishlistClick}
          className="relative bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-200 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 border border-white/30"
        >
          <span>💖</span>
          Wishlist
          {wishlistCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={onCartClick}
          className="relative bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-200 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 border border-white/30"
        >
          <span>🛍️</span>
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;