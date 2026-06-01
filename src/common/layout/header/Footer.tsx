// components/Footer.tsx
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black  text-white mt-10">
      <div className="max-w-[1400px] mx-auto px-6 py-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <h2 className="text-xl font-bold mb-3">ShopEase</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop destination for electronics, fashion, and more.
              Simple shopping, better experience.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/products" className="hover:text-white">Products</Link></li>
              <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
              <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
            </ul>
          </div>

          {/* CUSTOMER */}
          <div>
            <h3 className="font-semibold mb-3">Customer Care</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Returns</li>
              <li className="hover:text-white cursor-pointer">Shipping Info</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <p className="text-sm text-gray-400">support@shopease.com</p>
            <p className="text-sm text-gray-400 mt-1">+91 98765 43210</p>
            <p className="text-sm text-gray-400 mt-1">
              Pune, Maharashtra, India
            </p>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Support</span>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
