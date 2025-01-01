import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Gravatar from "react-gravatar";
import { ShoppingCart, Search, User, Menu, X, Heart, ChevronDown } from "lucide-react";
import { logoutUser } from "../actions/authActions";
import { removeFromCart, clearCart } from "../actions/cartActions";
import { removeFromWishlist } from "../actions/wishlistActions";
import { MenuContext } from "../context/MenuContext";
import api, { endpoints } from "../services/apiService";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(endpoints.categories);
        // Get unique categories by title
        const uniqueCategories = response.data.reduce((acc, current) => {
          const x = acc.find(item => item.title === current.title);
          if (!x) {
            return acc.concat([current]);
          } else if (current.rating > x.rating) {
            return acc.map(item => item.title === current.title ? current : item);
          }
          return acc;
        }, []);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
  }, [isAuthenticated]);

  useEffect(() => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsDropdownOpen(false);
    setIsShopOpen(false);
  }, [location]);

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

  const renderWishlistDropdown = () => {
    return (
      <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 p-4">
        {wishlistItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your wishlist is empty</p>
        ) : (
          <>
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 mb-4">
                <img
                  src={item.images?.[0] || item.image || 'https://via.placeholder.com/150'}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-[#23A6F0] font-bold">
                    ${item.price}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <Link
              to="/wishlist"
              className="block w-full text-center bg-[#23A6F0] text-white py-2 rounded-md hover:bg-[#1a85c2] transition-colors mt-4"
              onClick={() => setIsWishlistOpen(false)}
            >
              View Wishlist
            </Link>
          </>
        )}
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
            <div className="relative">
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
                onClick={() => setIsShopOpen(!isShopOpen)}
              >
                Shop
                <ChevronDown size={16} />
              </button>
              {isShopOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 font-medium text-gray-900">Kadın</div>
                    {categories
                      .filter(cat => cat.gender === "k")
                      .map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            navigate(`/shop/${category.title.toLowerCase()}/${category.id}`);
                            setIsShopOpen(false);
                          }}
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        >
                          {category.title}
                        </button>
                      ))}
                    <div className="px-4 py-2 font-medium text-gray-900 mt-2">Erkek</div>
                    {categories
                      .filter(cat => cat.gender === "e")
                      .map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            navigate(`/shop/${category.title.toLowerCase()}/${category.id}`);
                            setIsShopOpen(false);
                          }}
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        >
                          {category.title}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
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
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a85c2] transition-colors"
                >
                  <div className="flex items-center">
                    <Gravatar
                      email={user?.email || ""}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="ml-2">Hello, {user?.name?.split(" ")[0]}</span>
                    <ChevronDown className={`w-4 h-4 ml-1 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(logoutUser());
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a85c2] transition-colors"
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
              <span className="hidden md:inline ml-3 text-[#23A6F0] hover:text-[#1a85c2]">
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
                <span className="hidden md:inline ml-3 text-[#23A6F0] hover:text-[#1a85c2]">
                  Cart
                </span>
              </button>
              {isCartOpen && renderCartDropdown()}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsWishlistOpen(!isWishlistOpen);
                  setIsCartOpen(false);
                }}
                className={`flex text-[#23A6F0] hover:text-[#1a85c2] transition-colors relative items-center ${
                  isMenuOpen ? "hidden" : "flex"
                }`}
              >
                <div className="relative flex items-center">
                  <div className="relative">
                    <Heart className="w-5 h-5" />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 text-[10px] bg-[#23A6F0] text-white rounded-full px-1">
                        {wishlistItems.length}
                      </span>
                    )}
                  </div>
                  <span className="hidden md:inline ml-3 text-[#23A6F0] hover:text-[#1a85c2]">
                    Wishlist
                  </span>
                </div>
              </button>
              {isWishlistOpen && renderWishlistDropdown()}
            </div>

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
                      <span className="ml-3">Search</span>
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
                      <span className="ml-3">Cart</span>
                    </button>
                    <button
                      className="flex items-center text-[#23A6F0] hover:text-[#1a85c2]"
                      onClick={() => navigateTo("/wishlist")}
                    >
                      <div className="relative">
                        <Heart className="w-6 h-6" />
                        {wishlistItems.length > 0 && (
                          <span className="absolute -top-2 -right-2 text-[10px] bg-[#23A6F0] text-white rounded-full px-1">
                            {wishlistItems.length}
                          </span>
                        )}
                      </div>
                      <span className="ml-3">Wishlist</span>
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
