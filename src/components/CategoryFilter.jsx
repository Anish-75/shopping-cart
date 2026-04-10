function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="bg-white border-b border-blue-100/50 sticky top-14 sm:top-16 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Horizontal scrollable category bar */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {/* All Products button */}
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>

          {/* Category buttons */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 capitalize ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default CategoryFilter;
