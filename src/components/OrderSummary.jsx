function OrderSummary({ items, subtotal, discount = 0 }) {
  const tax = (subtotal * 0.1).toFixed(2); // 10% tax
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping above 500
  const total = (parseFloat(subtotal) + parseFloat(tax) + shipping - discount).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-blue-100">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Order Summary</h3>

      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-blue-200">
        <div className="flex justify-between text-xs sm:text-base text-gray-700">
          <span>Subtotal ({items} items)</span>
          <span>₹{subtotal}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-semibold text-xs sm:text-base">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-xs sm:text-base text-gray-700">
          <span>Tax (10%)</span>
          <span>₹{tax}</span>
        </div>

        <div className="flex justify-between text-xs sm:text-base text-gray-700">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
            {shipping === 0 ? 'Free' : `₹${shipping}`}
          </span>
        </div>

        {shipping > 0 && subtotal < 500 && (
          <p className="text-xs text-gray-600">
            Free shipping on orders over ₹500
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          ₹{total}
        </span>
      </div>

      <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default OrderSummary;
