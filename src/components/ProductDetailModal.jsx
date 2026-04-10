function ProductDetailModal({ product, onClose, onAddToCart, onWishlistToggle, wishlist = [] }) {
  if (!product) return null;

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const stock = product.stock || 10;
  const reviews = product.reviews || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 py-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => onWishlistToggle(product)}
            className={`rounded-full p-2.5 shadow-lg transition-all ${
              isWishlisted ? 'bg-red-100 text-red-600' : 'bg-white/90 text-gray-600 hover:bg-white'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isWishlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 bg-white/90 rounded-full p-2.5 shadow-lg"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 shadow-sm">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {product.images?.slice(0, 3).map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg bg-blue-50 h-20">
                  <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-1">{product.category}</p>
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{product.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-xs text-blue-600 font-bold mb-1">Price</p>
                <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
              </div>
              <div className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 p-3 text-white">
                <p className="text-xs font-bold mb-1">Availability</p>
                <p className="text-sm font-semibold">{stock > 0 ? `${stock} in stock` : 'Out of Stock'}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500 mb-0.5">Rating</p>
                <p className="text-sm font-bold text-blue-600">{product.rating?.toFixed(1)} ★</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500 mb-0.5">Discount</p>
                <p className="text-sm font-bold text-blue-600">{product.discountPercentage}%</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500 mb-0.5">Brand</p>
                <p className="text-sm font-bold text-blue-600">{product.brand}</p>
              </div>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              disabled={stock === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {(reviews.length > 0) && (
          <div className="border-t border-blue-100 p-6 bg-gradient-to-b from-slate-50 to-white">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Reviews ({reviews.length})</h3>
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {reviews.map((review, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 p-4 rounded-xl border-2 border-blue-200 shadow-md hover:shadow-lg transition-all duration-200 cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                  
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm text-gray-900">{review.reviewerName || 'Anonymous'}</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                            {review.rating} ★
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">Verified buyer</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailModal;
