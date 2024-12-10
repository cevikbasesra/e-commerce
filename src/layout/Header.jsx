import { ShoppingCart, Search, User, Menu } from "lucide-react";
const Header = () => {
  return (
    <header className="bg-white p-4 space-y-20">
      <div className="flex flex-row sm:flex-row items-center justify-between sm:items-center">
        {/* Header */}
        <h1 className="text-xl font-bold sm:text-left w-full sm:w-auto ">
          E-commerce
        </h1>

        {/* İkonlar  */}
        <div className="flex space-x-6 sm:ml-auto sm:space-x-6">
          <button className="text-gray-700">
            <User className="w-5 h-5" />
          </button>
          <button className="text-gray-700">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-700">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="text-gray-700">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="flex flex-col items-center space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0">
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
