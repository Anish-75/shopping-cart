function ProductRecommendations({ products, title = "Recommended For You", limit = 5 }) {
  if (!products || products.length === 0) return null;

  const displayProducts = products.slice(0, limit);

  return (
    <div className="bg-white rounded-2xl p-8 border border-blue-100/50 shadow-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {displayProducts.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-blue-100/50 hover:border-blue-300"
          >
            <div className="relative overflow-hidden rounded-lg mb-3 bg-white h-32">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
              {product.title}
            </h4>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ₹{product.price}
              </span>
            </div>

            {product.rating && (
              <div className="mt-2 flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductRecommendations;
