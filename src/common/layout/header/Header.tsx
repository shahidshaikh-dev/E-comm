import { useEffect, useState } from "react";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { logout } from "../../../store/slices/authSlice";
import type { RootState } from "../../../store/store";

import { CustomSearchbar } from "../../common/CustomSearchBar/CustomSearchbar";
import ProfileModal from "../../layout/header/ProfileModal";

import { Search, Heart, ShoppingCart, X } from "lucide-react";

/* ================= HEADER ================= */

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  /* ================= REDUX ================= */

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const cartCount = cartItems.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0,
  );

  const wishlistCount = wishlistItems.length;

  /* ================= DEBOUNCE ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* ================= SEARCH API ================= */

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      if (!debouncedSearch.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${debouncedSearch}`,
          { signal: controller.signal },
        );

        if (!response.ok) throw new Error("API error");

        const data = await response.json();

        setSearchResults(Array.isArray(data.products) ? data.products : []);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error(error);
          toast.error("Search failed");
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [debouncedSearch]);

  /* ================= LOGOUT ================= */

  const confirmLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="fixed top-0 left-0 w-full h-9 bg-black z-[60] flex items-center justify-center px-4">
        <div className="w-full max-w-7xl flex items-center justify-center relative text-white text-xs">
          <p className="text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <span className="ml-2 underline font-semibold cursor-pointer">
              ShopNow
            </span>
          </p>

          <div className="absolute right-0 flex items-center gap-1 cursor-pointer">
            <span>English</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="fixed top-9 left-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto h-[70px] px-6 flex items-center justify-between">
          {/* LOGO */}
          <div onClick={() => navigate("/products")} className="cursor-pointer">
            <h1 className="text-[28px] font-bold!">E-comm</h1>
          </div>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-10">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-black border-b border-black pb-1 text-sm"
                  : "text-gray-700 hover:text-black text-sm"
              }
            >
              Home
            </NavLink>

            <button className="text-sm text-gray-700 hover:text-black">
              Contact
            </button>

            <button className="text-sm text-gray-700 hover:text-black">
              About
            </button>

            <button
              onClick={() => navigate("/signUp")}
              className="text-sm text-gray-700 hover:text-black"
            >
              Sign Up
            </button>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">
            {/* SEARCH */}
            <div className="relative hidden lg:block">
              <div className="h-[38px] bg-[#f5f5f5] rounded flex items-center px-3">
                <CustomSearchbar
                  name="search"
                  value={searchTerm}
                  setSearchValue={setSearchTerm}
                  onChange={(e) =>
                    setSearchTerm((e.target as HTMLInputElement).value)
                  }
                  placeholder="What are you looking for?"
                  className="!border-none w-[300px]! !bg-transparent !text-sm flex-1 min-w-0"
                />

                {searchTerm ? (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSearchResults([]);
                    }}
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                ) : (
                  <Search className="w-5 h-5 text-black" />
                )}
              </div>

              {/* ✅ SEARCH DROPDOWN WITH IMAGES */}
              {searchResults.length > 0 && (
                <div className="absolute top-12 left-0 w-[350px] bg-white  shadow-lg  z-50 max-h-80 overflow-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        navigate(`/productDetails/${product.id}`);
                        setSearchTerm("");
                        setSearchResults([]);
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {/* PRODUCT IMAGE */}
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded"
                      />

                      {/* TITLE */}
                      <div className="text-sm truncate">{product.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ❤️ WISHLIST */}
            <button
              onClick={() => navigate("/wishlist")}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 relative"
            >
              <Heart
                className="w-5 h-5"
                fill={wishlistCount > 0 ? "red" : "transparent"}
                color={wishlistCount > 0 ? "red" : "black"}
              />

              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* CART */}
            <button
              onClick={() => navigate("/cart")}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <Badge
                count={cartItems.reduce(
                  (acc: number, item: any) => acc + item.quantity,
                  0,
                )}
                size="small"
              >
                <ShoppingCart className="w-5 h-5" />
              </Badge>
            </button>

            {/* PROFILE */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center"
              >
                S
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white border rounded-xl shadow-xl p-2 z-50">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-500 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="h-[106px]" />

      <ProfileModal
        open={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
}

export default Header;
