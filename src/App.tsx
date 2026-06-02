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

/* ================= PROTECTED ROUTE ================= */

interface RouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: RouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

/* ================= PUBLIC ROUTE ================= */

const PublicRoute = ({ children }: RouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return !isAuthenticated ? children : <Navigate to="/products" replace />;
};

/* ================= APP ================= */

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        {/* Root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signUp"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/products" replace />} />

          <Route path="/products" element={<Products />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<WishList />} />
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                useSelector((state: RootState) => state.auth.isAuthenticated)
                  ? "/products"
                  : "/login"
              }
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
