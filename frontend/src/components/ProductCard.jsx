import { useState } from 'react';
import ProductRating from './ProductRating';
import StockIndicator from './StockIndicator';

function ProductCard({ product, onAddToCart, cart = [], wishlist = [], onWishlistToggle, onViewDetails }) {
  const [isAdded, setIsAdded] = useState(false);
  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const stock = product.stock || 10; // Default stock if not provided

  const handleAddClick = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistToggle = () => {
    onWishlistToggle(product);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-blue-100/50">
      {/* Image Section */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-50 to-cyan-50 group">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-md hover:bg-white rounded-full p-2 transition-all shadow-md"
        >
          <svg
            className={`w-5 h-5 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
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
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 truncate text-lg">{product.title}</h3>
        
        {/* Rating */}
        <div className="mt-2">
          <ProductRating 
            rating={product.rating || 4.5} 
            reviewCount={product.reviews || 0}
          />
        </div>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Stock Indicator */}
        <StockIndicator stock={stock} />

        <div className="mt-5 space-y-3">
          <div className="flex justify-between items-center gap-3">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
            <div className="relative">
              <button
                onClick={handleAddClick}
                disabled={stock === 0}
                className={`text-white text-sm px-5 py-2.5 rounded-xl transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                  isAdded
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
                }`}
              >
                {isAdded ? '✓ Added' : stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              {quantityInCart > 0 && (
                <span className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  {quantityInCart}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => onViewDetails && onViewDetails(product)}
              className="text-blue-600 text-sm font-semibold hover:underline"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;