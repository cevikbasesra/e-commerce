import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useSwipeable } from "react-swipeable"; 
import { removeFromCart, updateCartItem } from "../actions/cartActions";

const MobileCartItem = ({
  item,
  onSelect,
  isSelected,
  onQuantityChange,
  onRemove,
}) => {
  const [swipeProgress, setSwipeProgress] = React.useState(0);

  const swipeHandlers = useSwipeable({
    onSwipeStart: (eventData) => {
      // Only track horizontal swipes
      if (Math.abs(eventData.deltaX) > Math.abs(eventData.deltaY)) {
        setSwipeProgress(0);
      }
    },
    onSwiping: (eventData) => {
      // Only track horizontal swipes to the left
      if (eventData.dir === 'Left') {
        setSwipeProgress(Math.min(Math.max(-eventData.deltaX / 2, 0), 100));
      }
    },
    onSwipedLeft: () => {
      if (swipeProgress > 50) {  // Require significant swipe
        onRemove(item.id);
      }
      setSwipeProgress(0);
    },
    onSwipeEnd: () => {
      setSwipeProgress(0);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div 
      {...swipeHandlers}
      className="relative bg-white rounded-lg shadow p-4 mb-4 overflow-hidden"
    >
      {/* Delete Background */}
      <div 
        className="absolute inset-y-0 right-0 bg-red-500 w-16 flex items-center justify-center"
        style={{ 
          transform: `translateX(${100 - swipeProgress}%)`,
          opacity: swipeProgress / 100 
        }}
      >
        <Trash2 className="w-6 h-6 text-white" />
      </div>

      {/* Main Content */}
      <div 
        className="relative z-10 bg-white" 
        style={{ 
          transform: `translateX(-${swipeProgress}%)` 
        }}
      >
        <div className="flex items-start space-x-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="h-4 w-4 text-[#23A6F0] focus:ring-[#23A6F0] border-gray-300 rounded mt-2"
          />
          <img
            src={item.image || "https://via.placeholder.com/150"}
            alt={item.name}
            className="h-20 w-20 object-cover rounded"
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">{item.name}</div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2 border rounded-md">
                <button
                  onClick={() =>
                    item.quantity === 1
                      ? onRemove(item.id)
                      : onQuantityChange(item, -1)
                  }
                  className="p-1 hover:bg-gray-100"
                >
                  {item.quantity === 1 ? (
                    <Trash2 className="w-4 h-4 text-red-500" />
                  ) : (
                    <Minus className="w-4 h-4" />
                  )}
                </button>
                <span className="text-sm text-gray-900">{item.quantity}</span>
                <button
                  onClick={() => onQuantityChange(item, 1)}
                  className="p-1 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = React.useState(new Set());

  // Select all items by default when component mounts
  React.useEffect(() => {
    if (cart.length > 0) {
      setSelectedItems(new Set(cart.map((item) => item.id)));
    }
  }, [cart]);

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      dispatch(updateCartItem(item.id, newQuantity));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleItemSelect = (itemId) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const calculateSelectedTotal = () => {
    return cart
      .filter((item) => selectedItems.has(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#23A6F0] text-white px-6 py-2 rounded hover:bg-[#1a85c2]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Mobile card view
  const renderMobileView = () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          checked={selectedItems.size === cart.length}
          onChange={() => {
            if (selectedItems.size === cart.length) {
              setSelectedItems(new Set());
            } else {
              setSelectedItems(new Set(cart.map((item) => item.id)));
            }
          }}
          className="h-4 w-4 text-[#23A6F0] focus:ring-[#23A6F0] border-gray-300 rounded mr-2"
        />
        <span className="text-sm text-gray-500">Select All</span>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <MobileCartItem 
            key={item.id}
            item={item}
            onRemove={handleRemoveItem}
            onSelect={() => handleItemSelect(item.id)}
            isSelected={selectedItems.has(item.id)}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      {selectedItems.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-top p-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm">Total:</span>
              <span className="text-lg font-semibold text-gray-900">
                ${calculateSelectedTotal()}
              </span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="flex-1 py-2 px-4 bg-[#23A6F0] text-white rounded-md hover:bg-[#1f95d8]"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Desktop card view
  const renderDesktopView = () => (
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedItems.size === cart.length}
              onChange={() => {
                if (selectedItems.size === cart.length) {
                  setSelectedItems(new Set());
                } else {
                  setSelectedItems(new Set(cart.map((item) => item.id)));
                }
              }}
              className="h-4 w-4 text-[#23A6F0] focus:ring-[#23A6F0] border-gray-300 rounded mr-2"
            />
            <span className="text-sm text-gray-500">Select All</span>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-lg shadow p-4 relative overflow-hidden"
              >
                <div className="grid grid-cols-12 items-center gap-4">
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleItemSelect(item.id)}
                      className="h-4 w-4 text-[#23A6F0] focus:ring-[#23A6F0] border-gray-300 rounded"
                    />
                  </div>
                  <div className="col-span-4 flex items-center">
                    <img
                      src={item.image || 'https://via.placeholder.com/150'}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded mr-4"
                    />
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center space-x-2 border rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        className="p-1 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        className="p-1 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-gray-900 text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="col-span-3 flex justify-end">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-80 h-fit bg-white rounded-lg shadow p-6 sticky top-4">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Selected Items:</span>
            <span>{selectedItems.size}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Items:</span>
            <span>
              {cart.reduce(
                (sum, item) =>
                  sum + (selectedItems.has(item.id) ? item.quantity : 0),
                0
              )}
            </span>
          </div>
          <div className="flex justify-between font-medium text-lg pt-3 border-t">
            <span>Total:</span>
            <span className="text-gray-900 font-semibold">${calculateSelectedTotal()}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            disabled={selectedItems.size === 0}
            className={`w-full py-2 px-4 rounded-md text-white mt-4 ${
              selectedItems.size === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#23A6F0] hover:bg-[#1f95d8]"
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">
        Shopping Cart ({cart.length} items)
      </h2>

      {/* Show mobile view on small screens, desktop view on larger screens */}
      <div className="hidden md:block mb-6">{renderDesktopView()}</div>
      <div className="md:hidden mb-6">{renderMobileView()}</div>
    </div>
  );
};

export default CartPage;
