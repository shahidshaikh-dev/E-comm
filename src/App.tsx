import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Products from "./pages/products/Products";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import ProductDetails from "./pages/products/ProductDetails";
import Layout from "./common/layout/Layout";
import Profile from "./common/layout/Profile";
import Cart from "./pages/cart/Cart";
import WishList from "./pages/Wishlist/Wishlist";
import "./index.css";

import type { RootState } from "./store/slices/store.ts";

/* ================= AUTH GUARD ================= */

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  // safer guard (prevents flicker edge cases)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/* ================= APP ================= */

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Protected Routes Wrapper */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Default route after login */}
          <Route index element={<Navigate to="/products" replace />} />

          <Route path="/products" element={<Products />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<WishList />} />
        </Route>

        {/* fallback (IMPORTANT: avoid redirect loops) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
