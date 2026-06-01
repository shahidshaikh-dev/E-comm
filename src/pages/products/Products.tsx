import { useEffect, useState, useRef } from "react";
import { Spin, Select } from "antd";
import ProductCard from "../../common/ProductCard/ProductCard";
import Featrued from "../../components/Featured";
import BestProducts from "../../components/BestProducts";

import {
  FiSmartphone,
  FiMonitor,
  FiWatch,
  FiCamera,
  FiHeadphones,
} from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";

/* ================= TYPES ================= */

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

interface Category {
  slug: string;
  name: string;
  url: string;
}

/* ================= COMPONENT ================= */

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (dir: "left" | "right") => {
    if (!categoryScrollRef.current) return;
    categoryScrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const banners = [
    {
      bg: "/images/e-comm bg.jpg",
      phone: "/images/main banner.png",
      logo: "/images/iPhone1.jpg",
    },
    {
      bg: "/images/poster.png",
      phone: "/images/main banner.png",
      logo: "/images/iPhone1.jpg",
    },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((p) => (p + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: string) => {
    const name = category.toLowerCase();

    if (name.includes("phone")) return <FiSmartphone size={22} />;
    if (name.includes("laptop")) return <FiMonitor size={22} />;
    if (name.includes("watch")) return <FiWatch size={22} />;
    if (name.includes("camera")) return <FiCamera size={22} />;
    if (name.includes("headphone")) return <FiHeadphones size={22} />;
    if (name.includes("game")) return <IoGameControllerOutline size={22} />;

    return <FiMonitor size={22} />;
  };

  /* ================= DATA ================= */

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        let url = "https://dummyjson.com/products";

        if (sortOrder) {
          url += `?sortBy=price&order=${sortOrder}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        let list: Product[] = data.products || [];

        if (selectedCategories.length) {
          list = list.filter((p) =>
            selectedCategories.includes(p.category || ""),
          );
        }

        setProducts(list);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategories, sortOrder]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug],
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ================= HERO ================= */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* ===== CATEGORY SIDEBAR ===== */}
          <div
            className="
            w-full lg:w-[250px]
            bg-white
            lg:h-[344px]
          "
          >
            {/* MOBILE SCROLL WRAP */}
            <div
              ref={categoryScrollRef}
              className="
                flex lg:block
                overflow-x-auto lg:overflow-y-auto
                whitespace-nowrap lg:whitespace-normal
              "
            >
              {[
                "smartphones",
                "laptops",
                "watches",
                "cameras",
                "headphones",
                "gaming",
                "tablets",
              ].map((item) => (
                <label
                  key={item}
                  onClick={() => toggleCategory(item)}
                  className={`
                    flex items-center justify-between
                    px-4 py-3
                    cursor-pointer
                    min-w-[140px] lg:min-w-full
                    transition
                    ${
                      selectedCategories.includes(item)
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  <span className="text-sm font-medium capitalize">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ===== BANNER ===== */}
          <div
            className="
            relative w-full
            h-[220px] sm:h-[260px] md:h-[300px] lg:h-[344px]
             overflow-hidden
          "
          >
            <img
              src={banners[currentBanner].bg}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBanner(i)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === currentBanner ? "bg-red-500" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= CATEGORIES ================= */}
        <div className="mt-12">
             <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-8 bg-red-500 rounded-sm"></div>

              <span className="text-sm text-red-500 font-semibold">
                categories
              </span>
            </div>
          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl sm:text-2xl font-bold">Browse Categories</h2>

            <div className="flex gap-2">
              <button onClick={() => scrollCategories("left")}>←</button>
              <button onClick={() => scrollCategories("right")}>→</button>
            </div>
          </div>

          <div
            className="
            flex gap-3 overflow-x-auto pb-2
            scrollbar-hide
          "
          >
            {categories.map((cat) => (
              <div
                key={cat.slug}
                onClick={() => toggleCategory(cat.slug)}
                className={`
                  flex-shrink-0
                  w-[120px] sm:w-[140px]
                  h-[100px]
                   border border-gray-200 rounded-md
                  flex flex-col items-center justify-center
                  cursor-pointer
                  ${
                    selectedCategories.includes(cat.slug)
                      ? "bg-red-500 text-white"
                      : "hover:border-red-400"
                  }
                `}
              >
                {getCategoryIcon(cat.name)}
                <p className="text-xs mt-2 text-center capitalize">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-8 bg-red-500 rounded-sm"></div>

            <span className="text-sm text-red-500 font-semibold">
              Explore Our Products{" "}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Products</h2>

            <Select
              className="w-full sm:w-[180px]"
              placeholder="Sort"
              onChange={setSortOrder}
              options={[
                { label: "Low → High", value: "asc" },
                { label: "High → Low", value: "desc" },
              ]}
              allowClear
            />
          </div>

          {products.length === 0 ? (
            <p className="text-center py-10 text-gray-500">No products found</p>
          ) : (
            <div
              className="
        grid
        grid-cols-3      /* 👈 MOBILE: 3 per row */
        sm:grid-cols-3   /* small screens */
        md:grid-cols-3   /* tablets */
        lg:grid-cols-4   /* desktop */
        xl:grid-cols-5
        gap-2 sm:gap-4 md:gap-6
      "
            >
              {products.map((p) => (
                <div key={p.id} className="w-full min-w-0">
                  <ProductCard
                    id={p.id}
                    title={p.title}
                    price={p.price}
                    discountPercentage={p.discountPercentage}
                    brand={p.brand}
                    image={p.images?.[0] || p.thumbnail}
                    rating={p.rating}
                    reviews={p.reviews?.length}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <BestProducts products={products} />
        <Featrued />
      </div>
    </div>
  );
}

export default Products;
