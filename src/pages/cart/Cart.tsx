import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/slices/store";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../store/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  const subtotal = cartItems.reduce(
    (acc: number, item: any) =>
      acc + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center px-6">
        <div className="flex flex-col items-center text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            className="w-32"
          />
          <h1 className="text-3xl font-semibold mt-6">
            Your Cart is Empty
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-[90px] px-3 sm:px-5 py-4">

      <div className="max-w-6xl mx-auto">

        {/* ITEMS */}
        <div className="space-y-4">

          {cartItems.map((item: any) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(`/productdetails/${item.id}`)
              }
              className="bg-white border border-gray-200 rounded-2xl p-3 flex items-center gap-3"
            >

              {/* IMAGE */}
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                <img
                  src={item.image}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold truncate">
                  {item.title}
                </h2>

                <p className="text-gray-500 text-sm">
                  ₹{item.price}
                </p>

                <p className="font-semibold mt-1">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* QTY */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    dispatch(incrementQuantity(item.id))
                  }
                  className="w-8 h-8"
                >
                  +
                </button>

                <div className="w-8 h-8 flex items-center justify-center border-y">
                  {item.quantity}
                </div>

                <button
                  onClick={() =>
                    dispatch(decrementQuantity(item.id))
                  }
                  className="w-8 h-8"
                >
                  -
                </button>
              </div>

              {/* DELETE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeFromCart(item.id));
                }}
                className="text-gray-400 ml-2"
              >
                ✕
              </button>

            </div>
          ))}

        </div>
      </div>

      {/* ================= BOTTOM STICKY BAR ================= */}
<div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md px-6 py-4 flex items-center justify-between gap-4 z-50">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-bold">
            ₹{total.toFixed(2)}
          </p>
        </div>

        <button className="bg-black text-white px-6 py-3 rounded-xl font-medium">
          Payment
        </button>

      </div>

    </div>
  );
}

export default Cart;
