import React, { useState } from "react";
import ProductCard from "../common/ProductCard/ProductCard";
import CustomButton from "../common/common/CustomButton/CustomButton"

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
  price: number;
  rating: number;
  stock: number;
  brand?: string;
  category?: string;
  availabilityStatus?: string;
  discountPercentage: number;
  images?: string[];
  thumbnail?: string;
  reviews?: Review[];
}

interface BestProductsProps {
  products: Product[];
}

function BestProducts({ products }: BestProductsProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll
    ? products
    : products.slice(0, 4);

  return (
    <div className="max-w-[1000px] mx-auto mt-20">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-8 bg-red-500 rounded-sm"></div>

            <span className="text-sm text-red-500 font-semibold">
              This Month
            </span>
          </div>

          <h2 className="text-3xl font-bold">
            Best Selling Products
          </h2>
        </div>

<CustomButton
  title={showAll ? "Show Less" : "View All"}
  onClick={() => setShowAll(!showAll)}
  className="
    filled
    small-primary
    bg-red-500! hover:bg-red-600!
    text-white!
    w-fit! sm:w-auto!
    px-4 sm:px-6
    rounded-md!
    transition
  "
/>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            discountPercentage={product.discountPercentage}
            brand={product.brand}
            image={product.images?.[0] || product.thumbnail}
            rating={product.rating}
            reviews={product.reviews?.length}
          />
        ))}
      </div>

      {/* ================= BANNER ================= */}
      <div className="mt-16 relative rounded-md overflow-hidden">
        <div className="bg-black flex items-center justify-center p-6 lg:p-10">
          <img
            src="/images/dark-banner.svg"
            className="w-full max-w-[900px] object-contain"
            alt="speaker"
          />
        </div>
      </div>
    </div>
  );
}

export default BestProducts;
