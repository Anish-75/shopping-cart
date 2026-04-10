function ProductDetailModal({ product, onClose, onAddToCart, onWishlistToggle, wishlist = [] }) {
  if (!product) return null;

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const stock = product.stock || 10;

  const specifications = [
    { label: 'Brand', value: product.brand || 'Unknown' },
    { label: 'Category', value: product.category || 'Unknown' },
    { label: 'Price', value: `₹${product.price}` },
    { label: 'Rating', value: `${product.rating?.toFixed(1) || 'N/A'} / 5` },
    { label: 'Stock', value: product.stock ? `${product.stock} available` : 'Limited stock' },
    { label: 'Discount', value: `${product.discountPercentage || 0}%` },
  ];

  const reviews = [
    { name: 'Maya Patel', comment: 'Amazing quality and fast delivery! The product felt premium and the colors are vibrant.', rating: 5 },
    { name: 'Arjun Singh', comment: 'Good value for money. I would have liked the packaging to be a bit better.', rating: 4 },
    { name: 'Rhea Kapoor', comment: 'Works exactly as described, and the shipping was quick. Highly recommended.', rating: 4.5 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute top-5 right-5 z-10 flex items-center gap-3">
          <button
            onClick={() => onWishlistToggle(product)}
            className={`rounded-full p-3 shadow-lg transition-all ${
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
            className="text-gray-500 hover:text-gray-900 bg-white/90 rounded-full p-3 shadow-lg"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 shadow-inner">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {product.images?.slice(0, 4).map((image, index) => (
                <div key={index} className="overflow-hidden rounded-3xl bg-blue-50 h-32">
                  <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold mb-2">Product Details</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">{product.title}</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-blue-50 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-blue-600 font-bold mb-2">Price</p>
                <p className="text-3xl font-bold text-gray-900">₹{product.price}</p>
              </div>
              <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.25em] font-bold mb-2">Availability</p>
                <p className="text-3xl font-bold">{stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-blue-50 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="grid gap-3">
                {specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between text-sm text-gray-700">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => onAddToCart(product)}
                disabled={stock === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-4 rounded-3xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-100 p-8 bg-slate-50">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.name} className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <p className="text-xs text-gray-500">Verified buyer</p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">{review.rating} ★</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Return Policy</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3 items-start">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>30-day easy returns from the delivery date.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>Full refund if the product is unused and in original condition.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>Fast support available for return pickup requests.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>Exchange support for damaged or defective items.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;
