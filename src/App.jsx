// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrdersPage from "./pages/OrdersPage";
import AboutUsPage from "./pages/AboutUsPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:category/:categoryId" element={<ShopPage />} />
              <Route
                path="/shop/:category/:categoryId/:productNameSlug/:productId"
                element={<ProductDetailPage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/create-order"
                element={
                  <ProtectedRoute>
                    <CreateOrderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/order-success" element={<OrderSuccessPage />} />
            </Routes>
          </Layout>
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </MenuProvider>
    </Provider>
  );
}

export default App;
