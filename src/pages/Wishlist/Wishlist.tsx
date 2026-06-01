import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState } from "../../store/store";
import { removeFromWishlist } from "../../store/slices/wishlistSlice.ts";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector(
    (state: RootState) => state.wishlist.items,
  );

  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <h2 className="text-xl font-semibold">Your Wishlist is Empty</h2>
        <p className="text-sm mt-2">Save items you like by clicking the ❤️ icon</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div
              onClick={() => navigate(`/productDetails/${item.id}`)}
            >
              <img
                src={item.image || "/images/no-image.png"}
                alt={item.title}
                className="w-full h-[140px] object-cover rounded"
              />

              <h3 className="text-sm font-medium mt-2 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-red-500 font-semibold mt-1">
                ₹{item.price}
              </p>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="mt-3 w-full bg-black text-white py-1 rounded hover:bg-red-500 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
