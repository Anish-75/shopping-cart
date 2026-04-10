function CartSidebar({ cart, total, onClose, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <aside className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-bl-3xl">
          <h2 className="text-2xl font-bold">🛍️ Your Cart</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors font-bold text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Cart items — lists & keys */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center mt-24 text-lg">
              Your cart is empty 🛒
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center pb-4 border-b last:border-0"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-800 truncate">
                    {item.title}
                  </p>
                  <p className="text-blue-600 font-bold mt-0.5">₹{item.price}</p>

                  {/* Quantity controls — event handling */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onDecrease(item.id)}
                      className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full text-lg font-bold flex items-center justify-center transition-colors"
                    >
                      −
                    </button>
                    <span className="font-semibold text-gray-800 w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onIncrease(item)}
                      className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full text-lg font-bold flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-400 hover:text-red-600 text-xl transition-colors flex-shrink-0"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer — total & checkout */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="flex justify-between text-lg font-bold text-gray-800 mb-4">
            <span>Total</span>
            <span className="text-blue-600">₹{total}</span>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors text-base">
            Checkout →
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CartSidebar;