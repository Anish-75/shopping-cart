import OrderSummary from './OrderSummary';

function CartSidebar({ cart, total, onClose, onIncrease, onDecrease, onRemove }) {
  const cartItemCount = cart.length;

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
            <div className="flex flex-col items-center justify-center mt-24">
              <p className="text-5xl mb-3">🛒</p>
              <p className="text-gray-500 text-center text-lg font-medium">
                Your cart is empty
              </p>
              <p className="text-gray-400 text-sm mt-1">Add products to get started!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center pb-4 border-b border-blue-100/50 hover:bg-blue-50/30 p-2 rounded-lg transition-colors last:border-0"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-xl flex-shrink-0 border border-blue-100"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">
                    {item.title}
                  </p>
                  <p className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-bold mt-1">₹{item.price}</p>

                  {/* Quantity controls — event handling */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onDecrease(item.id)}
                      className="w-7 h-7 bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 rounded-full text-sm font-bold flex items-center justify-center transition-all text-blue-600"
                    >
                      −
                    </button>
                    <span className="font-semibold text-gray-900 w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onIncrease(item)}
                      className="w-7 h-7 bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 rounded-full text-sm font-bold flex items-center justify-center transition-all text-blue-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        {cart.length > 0 && (
          <div className="px-6 py-4 border-t border-blue-100 bg-gradient-to-b from-blue-50 to-cyan-50">
            <OrderSummary items={cartItemCount} subtotal={total} />
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartSidebar;