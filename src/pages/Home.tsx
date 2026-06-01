import React from "react";

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">

      {/* ================= LEFT SIDEBAR ================= */}
      <div className="w-[220px] hidden md:block">
        <ul className="space-y-3 text-sm text-gray-700">

          <li className="hover:text-black cursor-pointer">Women's Fashion</li>
          <li className="hover:text-black cursor-pointer">Men's Fashion</li>
          <li className="hover:text-black cursor-pointer">Electronics</li>
          <li className="hover:text-black cursor-pointer">Home & Lifestyle</li>
          <li className="hover:text-black cursor-pointer">Medicine</li>
          <li className="hover:text-black cursor-pointer">Sports & Outdoor</li>
          <li className="hover:text-black cursor-pointer">Baby's & Toys</li>
          <li className="hover:text-black cursor-pointer">Groceries & Pets</li>
          <li className="hover:text-black cursor-pointer">Health & Beauty</li>

        </ul>
      </div>

      {/* ================= BANNER SECTION ================= */}
      <div className="flex-1">

        <div className="w-full h-[320px] bg-black rounded-xl overflow-hidden relative">

          <img
            src="/ecommerce-app/public/images/main-img.svg"
            alt="banner"
            className="w-full h-full object-cover"
          />

        </div>

      </div>

    </div>
  );
}

export default Home;
