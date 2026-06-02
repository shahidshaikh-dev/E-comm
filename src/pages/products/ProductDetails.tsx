import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import CustomButton from "../../common/common/CustomButton/CustomButton";
import { addToCart } from "../../store/slices/cartSlice.ts";

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  thumbnail: string;
  images: string[];
  reviews: Review[];
}

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        const data = await response.json();

        setProduct(data);
        setSelectedImage(data.images?.[0] || data.thumbnail || "");
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-medium">
        Product not found
      </div>
    );
  }

  const originalPrice = Math.round(
    product.price / (1 - product.discountPercentage / 100)
  );

  return (
    <div className="min-h-screen p-4 overflow-y-auto">

      <div className="max-w-7xl mx-auto bg-white rounded-xl p-1">

     <div
  className="
    grid grid-cols-1
    lg:grid-cols-[42%_58%]
    gap-5
    pr-4
    sm:pr-6
    lg:pr-10
  "
>

          {/* ================= IMAGES ================= */}
          <div className="flex flex-col">

            <div className="rounded-lg bg-white p-2">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-[260px] object-contain"
              />
            </div>

            <div className="flex gap-2 mt-2 flex-wrap">
              {product.images?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`border rounded-md p-1 cursor-pointer ${
                    selectedImage === image
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* ================= DETAILS ================= */}
          <div className="flex flex-col">

            <h1 className="text-2xl font-semibold text-gray-900">
              {product.title}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {product.brand}
            </p>

            <div className="flex flex-wrap gap-2 mt-3 text-sm">
              <span className="bg-black text-white px-2 py-0.5 rounded text-xs">
                {product.rating.toFixed(1)} ★
              </span>

              <span className="text-gray-500">{product.category}</span>

              <span className="text-gray-500">
                {product.reviews?.length || 0} reviews
              </span>
            </div>

            <p className="mt-3 text-gray-700 text-sm line-clamp-3">
              {product.description}
            </p>

            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-bold">
                ₹{product.price}
              </span>

              <span className="text-lg text-gray-400 line-through">
                ₹{originalPrice}
              </span>

              <span className="text-green-600 text-sm font-medium">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            </div>

            <div className="mt-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.availabilityStatus}
              </span>
            </div>

            {/* ================= BUTTONS (FIXED) ================= */}
            <div className="
              flex
              flex-col sm:flex-row
              gap-2
              mt-5
              w-full
            ">

              <CustomButton
                title="Add To Cart"
                className="small-primary filled text-sm w-full"
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.thumbnail,
                      quantity: 1,
                    })
                  );

                  toast.success("Product added to cart");
                }}
              />

              <CustomButton
                title="Buy Now"
                className="small-primary outline text-sm w-full"
                onClick={() => console.log("Buy Now")}
              />

            </div>

            {/* ================= INFO ================= */}
            <div className="mt-4 border-t pt-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-700">
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>SKU:</strong> {product.sku}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                <p><strong>Shipping:</strong> {product.shippingInformation}</p>
              </div>
            </div>

            {/* ================= REVIEWS ================= */}
            {product.reviews?.length > 0 && (
              <div className="mt-4 border-t pt-3">
                <h3 className="text-sm font-semibold mb-2">
                  Customer Reviews
                </h3>

<div className="space-y-2">                  {product.reviews.map((review, index) => (
                    <div key={index} className="border rounded-md p-2">
                      <div className="flex justify-between">
                        <h4 className="text-xs font-medium">
                          {review.reviewerName}
                        </h4>

                        <span className="text-xs bg-black text-white px-2 py-0.5 rounded">
                          {review.rating} ★
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 mt-1">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
