import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import Footer from "../layout/header/Footer";

const Layout = () => {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/cart" ||
    location.pathname === "/profile" ||
    location.pathname.startsWith("/productDetails/");

  return (
    <section className="min-h-screen flex flex-col">
      <Header />

      {/* Home / pages render right here under header */}
      <div className="pt-10 flex-1">
        <Outlet />
      </div>

      {!hideFooter && <Footer />}
    </section>
  );
};

export default Layout;
