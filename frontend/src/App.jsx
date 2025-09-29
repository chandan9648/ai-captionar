import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import { set } from "../../backend/src/app";

export default function App() {
  // const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null while checking

  // Check auth status on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!cancelled) setIsLoggedIn(res.ok);
      } catch {
        if (!cancelled) setIsLoggedIn(false);
      }
    })();
    return () => { cancelled = true; }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }); } catch { /* ignore */ }
    setIsLoggedIn(false);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
  };

  function ProtectedRoute({ children }) {
    if (isLoggedIn === null) return <div className="p-8 text-center">Loading...</div>;
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return children;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
        <Header isLoggedIn={!!isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace /> : <Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
