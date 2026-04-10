function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-blue-100/50">
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-50 to-cyan-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 truncate text-lg">{product.title}</h3>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            ₹{product.price}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm px-5 py-2.5 rounded-xl transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;