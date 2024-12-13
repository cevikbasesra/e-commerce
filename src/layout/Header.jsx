import { ShoppingCart, Search, User, Menu, X } from "lucide-react"; // User ikonunu import ettik
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router'dan navigate fonksiyonu import

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // navigate fonksiyonunu oluşturduk

  let user = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      // Only parse if userData is not null or undefined
      user = JSON.parse(userData);
    } else {
      console.log("User data not found in localStorage."); // Helpful for debugging
      // Optionally, redirect to login here if no user is found.
      //navigate("/login");
    }
  } catch (error) {
    console.error("User data is not valid JSON:", error);
    // Clear localStorage if the JSON is corrupted and redirect to login.
    localStorage.removeItem("user");
    user = null;
    navigate("/login"); // Redirect to login after handling the error
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLoginClick = () => {
    navigate("/login"); // Kullanıcı Login butonuna tıkladığında login sayfasına yönlendiriliyor
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login"); // Çıkış yapıldıktan sonra login sayfasına yönlendiriliyor
  };

  return (
    <header className="bg-white p-4">
      <div className="flex flex-row sm:flex-row items-center justify-between sm:items-center">
        {/* Header */}
        <h1 className="text-xl font-bold sm:text-left w-full sm:w-auto">
          E-commerce
        </h1>

        {/* Icons */}
        <div className="flex space-x-6 sm:ml-auto sm:space-x-6">
          {user ? (
            <>
              <span className="text-gray-700">{user.name}</span>
              <button className="text-gray-700" onClick={handleLogoutClick}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="text-gray-700" onClick={handleLoginClick}>
                <User className="w-5 h-5" /> {/* User ikonu kullanıldı */}
              </button>
              {/* Signup butonu kaldırıldı */}
            </>
          )}
          <button className="text-gray-700">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-700">
            <ShoppingCart className="w-5 h-5" />
          </button>
          {/* Menu Button */}
          <button className="text-gray-700 sm:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col items-center space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0`}
        >
          <li>
            <a href="/" className="text-gray-700">
              Home
            </a>
          </li>
          <li>
            <a href="/product" className="text-gray-700">
              Product
            </a>
          </li>
          <li>
            <a href="/pricing" className="text-gray-700">
              Pricing
            </a>
          </li>
          <li>
            <a href="/contact" className="text-gray-700">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
