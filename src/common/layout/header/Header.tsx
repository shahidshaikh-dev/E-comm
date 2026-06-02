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

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const wishlistCount = wishlistItems.length;

  /* ================= debounce ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* ================= search ================= */
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      if (!debouncedSearch.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${debouncedSearch}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        setSearchResults(data.products || []);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          toast.error("Search failed");
        }
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [debouncedSearch]);

  useEffect(() => {
    if (!searchTerm) setIsMobileSearchActive(false);
  }, [searchTerm]);

  const confirmLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="fixed top-0 left-0 w-full h-9 bg-black z-60 flex items-center justify-center px-4">
        <div className="w-full max-w-7xl flex items-center justify-center relative text-white text-xs">
          <p className="text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <span className="ml-2 underline font-semibold cursor-pointer">
              ShopNow
            </span>
          </p>
        </div>
      </div>

      {/* HEADER */}
      <header className="fixed top-9 left-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto h-17.5 px-6 flex items-center justify-between">

          {/* LOGO */}
          <div
            onClick={() => navigate("/products")}
            className="cursor-pointer hidden md:block"
          >
            <h1 className="text-[28px] font-bold">E-comm</h1>
          </div>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-10">
            <NavLink to="/products" className="text-sm">
              Home
            </NavLink>
            <button className="text-sm">Contact</button>
            <button className="text-sm">About</button>
            <button onClick={() => navigate("/signUp")} className="text-sm">
              Sign Up
            </button>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">

            {/* SEARCH */}
            <div className="relative flex items-center">

              {/* DESKTOP */}
              <div className="hidden lg:block">
                <div className="h-9.5 bg-[#f5f5f5] rounded flex items-center px-3">
                  <CustomSearchbar
                    name="search"
                    value={searchTerm}
                    setSearchValue={setSearchTerm}
                    onChange={(e) =>
                      setSearchTerm((e.target as HTMLInputElement).value)
                    }
                    placeholder="Search..."
                    className="!border-none w-[300px] !bg-transparent !text-sm"
                  />
                  <Search className="w-5 h-5 ml-2" />
                </div>
              </div>

              {/* MOBILE */}
              <div className="lg:hidden w-full">
                <div
                  className={`h-9 bg-[#f5f5f5] rounded flex items-center px-2 transition-all ${
                    isMobileSearchActive ? "w-full" : "max-w-55"
                  }`}
                >
                  <CustomSearchbar
                    name="search"
                    value={searchTerm}
                    setSearchValue={setSearchTerm}
                    onFocus={() => setIsMobileSearchActive(true)}
                    onChange={(e) => {
                      setSearchTerm((e.target as HTMLInputElement).value);
                      setIsMobileSearchActive(true);
                    }}
                    placeholder="Search..."
                    className="!border-none !bg-transparent flex-1"
                  />

                  {searchTerm ? (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSearchResults([]);
                        setIsMobileSearchActive(false);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </div>
              </div>

              {/* DROPDOWN */}
              {searchResults.length > 0 && (
                <div className="absolute top-12 left-0 w-[350px] bg-white shadow-lg z-50 max-h-80 overflow-auto">
                  {searchResults.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        navigate(`/productDetails/${p.id}`);
                        setSearchTerm("");
                        setSearchResults([]);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex gap-2"
                    >
                      <img src={p.thumbnail} className="w-10 h-10" />
                      <span className="text-sm">{p.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ICONS (FIXED LOGIC) */}
            <div
              className={`flex items-center gap-5 ${
                isMobileSearchActive ? "hidden lg:flex" : "flex"
              }`}
            >

              <button onClick={() => navigate("/wishlist")}>
                <Heart className="w-5 h-5" />
              </button>

              <button onClick={() => navigate("/cart")}>
                <ShoppingCart className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 bg-black text-white rounded-full"
              >
                S
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-12 bg-white border p-2">
                  <button onClick={() => navigate("/profile")}>
                    My Profile
                  </button>
                  <button onClick={() => setShowLogoutModal(true)}>
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      <div className="h-26.5" />

      <ProfileModal
        open={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
}

export default Header;
