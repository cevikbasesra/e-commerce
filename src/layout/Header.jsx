import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Gravatar from "react-gravatar";
import { ShoppingCart, Search, User, Menu, X, Heart, ChevronDown } from "lucide-react";
import { logoutUser } from "../actions/authActions";
import { removeFromCart, clearCart } from "../actions/cartActions";
import { MenuContext } from "../context/MenuContext";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  // Close dropdown when auth state changes
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsCartOpen(false);
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    dispatch(clearCart());  // Clear cart before logging out
    dispatch(logoutUser());
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsDropdownOpen(false); // Close dropdown when navigating
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const renderCartDropdown = () => {
    return (
      <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 p-4">
        <div className="text-lg font-medium mb-4">
          My Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </div>
        <div className="max-h-96 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-4">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-2 border-b">
                  <img
                    src={item.image || 'https://via.placeholder.com/300x400?text=No+Image'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-gray-500">
                      {item.quantity} x ${item.price} 
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeFromCart(item.id));
                    }}
                    className="text-black hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <div className="mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('/cart');
                    }}
                    className="flex-1 bg-[#23A6F0] text-white px-4 py-2 rounded hover:bg-[#1a85c2] transition-colors"
                  >
                    View Cart
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('/checkout');
                    }}
                    className="flex-1 bg-[#252B42] text-white px-4 py-2 rounded hover:bg-[#1e2333] transition-colors"
                  >
                    Complete Order
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <header className="bg-white shadow-sm p-2 md:p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-lg md:text-xl font-bold text-gray-800 cursor-pointer"
              onClick={() => navigateTo("/")}
            >
              E-commerce
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              About
            </Link>
            <Link
              to="/blog"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/pages"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Pages
            </Link>
          </nav>

          {/* Icons Section */}
          <div className="flex items-center space-x-4">
            {/* User Section */}
            {isAuthenticated && user ? (
              <div className="relative group">
                <div
                  className="flex items-center cursor-pointer gap-2"
                >
                  <Gravatar
                    email={user.email || `user-${user.id}@example.com`}
                    size={32}
                    className="rounded-full border-2 border-transparent hover:border-primary transition-all"
                    default="mp"
                  />
                  {isAuthenticated && user?.name && (
                    <span className="text-sm font-semibold text-[#23A6F0]">Hello, {user.name}</span>
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180 text-[#23A6F0]`} />
                </div>

                {/* User Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-2xl border-2 border-gray-100 py-1 z-50 hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#23A6F0] hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#23A6F0] hover:bg-gray-50"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#23A6F0] hover:bg-gray-50"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className={`flex items-center space-x-1 text-[#23A6F0] hover:text-[#1a85c2] ${
                  isMenuOpen ? "hidden" : "flex"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Login / Register</span>
              </button>
            )}

            <button
              className={`flex text-[#23A6F0] hover:text-[#1a85c2] transition-colors ${
                isMenuOpen ? "hidden" : "flex"
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline ml-1 text-[#23A6F0] hover:text-[#1a85c2]">
                Search
              </span>
            </button>

            <div className="relative">
              <button
                className={`flex text-[#23A6F0] hover:text-[#1a85c2] transition-colors relative items-center ${
                  isMenuOpen ? "hidden" : "flex"
                }`}
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 text-[10px] bg-[#23A6F0] text-white rounded-full px-1">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline ml-1 text-[#23A6F0] hover:text-[#1a85c2]">
                  Cart
                </span>
              </button>
              {isCartOpen && renderCartDropdown()}
            </div>

            <button
              className={`flex text-[#23A6F0] hover:text-[#1a85c2] transition-colors relative items-center ${
                isMenuOpen ? "hidden" : "flex"
              }`}
              onClick={() => navigateTo("/wishlist")}
            >
              <Heart className="w-5 h-5" />
              <span className="hidden md:inline ml-1 text-[#23A6F0] hover:text-[#1a85c2]">
                Wishlist
              </span>
            </button>

            {/* Mobile Menu Button */}
            <div className="block md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 text-[#23A6F0] hover:text-[#1a85c2] focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden fixed top-[60px] left-0 w-full bg-white shadow-lg">
              <div className="container mx-auto py-4 flex flex-col items-center">
                <Link
                  to="/"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                >
                  About
                </Link>
                <Link
                  to="/blog"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                >
                  Contact
                </Link>
                <Link
                  to="/pages"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                >
                  Pages
                </Link>

                {/* Mobile Icons Section */}
                <div className="w-full border-t mt-4 pt-4">
                  <div className="flex flex-col space-y-6 items-center">
                    {!isAuthenticated && (
                      <button
                        onClick={handleLoginClick}
                        className="flex items-center space-x-2 text-[#23A6F0] hover:text-[#1a85c2]"
                      >
                        <User className="w-6 h-6" />
                        <span className="text-sm">Login / Register</span>
                      </button>
                    )}
                    <button className="flex items-center text-[#23A6F0] hover:text-[#1a85c2]">
                      <Search className="w-6 h-6" />
                      <span className="ml-2">Search</span>
                    </button>
                    <button
                      className={`flex text-[#23A6F0] hover:text-[#1a85c2] transition-colors relative items-center`}
                      onClick={() => navigateTo("/cart")}
                    >
                      <div className="relative">
                        <ShoppingCart className="w-6 h-6" />
                        {totalItems > 0 && (
                          <span className="absolute -top-2 -right-2 text-[10px] bg-[#23A6F0] text-white rounded-full px-1">
                            {totalItems}
                          </span>
                        )}
                      </div>
                      <span className="ml-2">Cart</span>
                    </button>
                    <button
                      className="flex items-center text-[#23A6F0] hover:text-[#1a85c2]"
                      onClick={() => navigateTo("/wishlist")}
                    >
                      <div className="relative">
                        <Heart className="w-6 h-6" />
                      </div>
                      <span className="ml-2">Wishlist</span>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
