// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./layout/Header"; // Header bileşenini import et
import LoginPage from "./pages/LoginPage"; // LoginPage bileşenini import et
import SignupPage from "./pages/SignupPage"; // SignupPage bileşenini import et
import HomePage from "./pages/HomePage"; // HomePage bileşenini import et
import { ToastContainer } from "react-toastify"; // Toastify için
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

const App = () => {
  return (
    <Router>
      <Header /> {/* Header bileşenini burada kullanıyoruz */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* HomePage için rota */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Diğer sayfalar buraya eklenebilir */}
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000} // Mesajların 5 saniye sonra kapanması
        hideProgressBar={false} // İlerleme çubuğunu gösterir
        newestOnTop={true} // Yeni mesajları en üstte gösterir
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />{" "}
      {/* Toast mesajları için */}
    </Router>
  );
};

export default App;
