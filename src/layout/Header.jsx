import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Gravatar from "react-gravatar";
import { ShoppingCart, Search, User, Menu, X, Heart } from "lucide-react";
import { logoutUser } from "../actions/authActions";
import { MenuContext } from "../context/MenuContext";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  // Close dropdown when auth state changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
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
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => navigateTo("/")}
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => navigateTo("/shop")}
            >
              Shop
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => navigateTo("/about")}
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => navigateTo("/blog")}
            >
              Blog
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => navigateTo("/contact")}
            >
              Contact
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => navigateTo("/pages")}
            >
              Pages
            </a>
          </nav>

          {/* Icons Section */}
          <div className="flex items-center space-x-4">
            {/* User Section */}
            {isAuthenticated && user ? (
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <Gravatar
                    email={user.email || `user-${user.id}@example.com`}
                    size={32}
                    className="rounded-full border-2 border-transparent hover:border-primary transition-all"
                    default="mp"
                  />
                </div>

                {/* User Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => navigateTo("/profile")}
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => navigateTo("/orders")}
                    >
                      Orders
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogoutClick}
                    >
                      Logout
                    </a>
                  </div>
                )}
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
            </button>

            <button
              className={`flex text-[#23A6F0] hover:text-[#1a85c2] transition-colors relative items-center ${
                isMenuOpen ? "hidden" : "flex"
              }`}
              onClick={() => navigateTo("/cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="ml-1 text-xs">0</span>
            </button>

            <button
              className={`flex text-[#23A6F0] hover:text-[#1a85c2] transition-colors relative items-center ${
                isMenuOpen ? "hidden" : "flex"
              }`}
              onClick={() => navigateTo("/wishlist")}
            >
              <Heart className="w-5 h-5" />
              <span className="ml-1 text-xs">0</span>
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
                <a
                  href="#"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                  onClick={() => navigateTo("/")}
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                  onClick={() => navigateTo("/shop")}
                >
                  Shop
                </a>
                <a
                  href="#"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                  onClick={() => navigateTo("/about")}
                >
                  About
                </a>
                <a
                  href="#"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                  onClick={() => navigateTo("/blog")}
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                  onClick={() => navigateTo("/contact")}
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="block py-2 text-gray-600 hover:text-gray-800 text-center w-full"
                  onClick={() => navigateTo("/pages")}
                >
                  Pages
                </a>

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
                    <button className="flex flex-col items-center text-[#23A6F0] hover:text-[#1a85c2]">
                      <Search className="w-6 h-6" />
                    </button>
                    <button
                      className="flex flex-col items-center text-[#23A6F0] hover:text-[#1a85c2]"
                      onClick={() => navigateTo("/cart")}
                    >
                      <div className="relative">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 text-xs">
                          0
                        </span>
                      </div>
                    </button>
                    <button
                      className="flex flex-col items-center text-[#23A6F0] hover:text-[#1a85c2]"
                      onClick={() => navigateTo("/wishlist")}
                    >
                      <div className="relative">
                        <Heart className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 text-xs">
                          0
                        </span>
                      </div>
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
