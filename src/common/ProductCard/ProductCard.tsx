import "./ProductCard.scss";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice.ts";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  brand?: string;
  image?: string;
  rating: number;
  reviews: number;
  disableNavigation?: boolean;
}

const ProductCard = ({
  id,
  title,
  price,
  discountPercentage,
  brand,
  image,
  rating,
  reviews,
  disableNavigation = false,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ GLOBAL wishlist state
  const isLiked = useSelector((state: RootState) =>
    state.wishlist.items.some((item) => item.id === id),
  );

  const originalPrice = Math.round(price / (1 - discountPercentage / 100));

  const handleClick = () => {
    if (disableNavigation) return;
    navigate(`/productDetails/${id}`);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isLiked) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(
        addToWishlist({
          id,
          title,
          price,
          image,
        }),
      );
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-wrapper">
        {/* ❤️ Wishlist Icon */}
        <div className="wishlist-icon" onClick={toggleLike}>
          {isLiked ? (
            <HeartFilled style={{ color: "red", fontSize: 18 }} />
          ) : (
            <HeartOutlined style={{ fontSize: 18 }} />
          )}
        </div>

        <img
          src={image || "/images/no-image.png"}
          alt={title}
          className="product-image"
        />
      </div>

      <div className="product-content">
        <h3 className="product-title">{title}</h3>

        {brand && <p className="brand">{brand}</p>}

        <div className="rating-section">
          <span className="rating-badge">{rating.toFixed(1)} ★</span>
          <span className="reviews">({reviews} Reviews)</span>
        </div>

        <div className="price-section">
          <span className="selling-price">₹{price}</span>
          <span className="original-price">₹{originalPrice}</span>
          <span className="discount">
            {Math.round(discountPercentage)}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
