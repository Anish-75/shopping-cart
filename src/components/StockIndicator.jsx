function StockIndicator({ stock }) {
  const isInStock = stock > 0;
  const isLowStock = stock > 0 && stock < 5;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 mt-2">
      <div
        className={`w-2 h-2 rounded-full ${
          isInStock ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      <span
        className={`text-xs sm:text-sm font-semibold ${
          isInStock
            ? isLowStock
              ? 'text-orange-600'
              : 'text-green-600'
            : 'text-red-600'
        }`}
      >
        {isInStock ? (
          isLowStock ? (
            <>Only {stock} left</>
          ) : (
            <>In Stock ({stock})</>
          )
        ) : (
          <>Out of Stock</>
        )}
      </span>
    </div>
  );
}

export default StockIndicator;
