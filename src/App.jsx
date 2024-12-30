// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuProvider } from "./context/MenuContext";
import { checkAuthStatus } from "./actions/authActions";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    // Check for token and verify on app load
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const verificationFlag = sessionStorage.getItem("verificationInProgress");
    
    console.log('Auth state:', { isAuthenticated, token, verificationFlag });
    
    if (token && !verificationFlag && !isAuthenticated) {
      console.log('Starting verification');
      sessionStorage.setItem("verificationInProgress", "true");
      dispatch(checkAuthStatus()).finally(() => {
        console.log('Verification completed');
        sessionStorage.removeItem("verificationInProgress");
      });
    }
  }, [dispatch, isAuthenticated]);

  return (
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
          </Routes>
        </Layout>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </MenuProvider>
  );
};

export default App;
