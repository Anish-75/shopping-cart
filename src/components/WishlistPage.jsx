function WishlistPage({ wishlist, onAddToCart, onRemoveFromWishlist, onViewDetails, onBackToShop }) {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Your Wishlist</h1>
          <p className="text-gray-600 mt-2">Keep your favorites in one place and add them to cart when ready.</p>
        </div>
        <button
          onClick={onBackToShop}
          className="bg-white border border-blue-200 text-blue-600 px-5 py-3 rounded-full shadow-sm hover:bg-blue-50 transition-all"
        >
          Back to Shop
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-blue-100 text-center shadow-sm">
          <p className="text-5xl mb-4">💖</p>
          <p className="text-xl font-semibold text-gray-900">Your wishlist is empty</p>
          <p className="text-gray-500 mt-2">Browse products and add items you love.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden">
              <img src={product.thumbnail} alt={product.title} className="w-full h-52 object-cover" />
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">Wishlist</p>
                  <h2 className="text-xl font-semibold text-gray-900 truncate mt-2">{product.title}</h2>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDetails(product)}
                      className="text-blue-600 text-sm font-semibold hover:underline"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="bg-red-50 text-red-600 px-3 py-2 rounded-full text-sm font-semibold hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
