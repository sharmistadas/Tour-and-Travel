import React from 'react';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import './ActionButtons.css';

const ActionButtons = ({
    item,
    isInWishlist,
    isInCart,
    onWishlistClick,
    onCartClick,
    className = ''
}) => {
    return (
        <div className={`action-buttons-group ${className}`}>
            <button
                className={`action-btn wishlist-btn ${isInWishlist ? 'active' : ''}`}
                onClick={(e) => onWishlistClick(e, item)}
                title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
                <Heart
                    size={20}
                    fill={isInWishlist ? "currentColor" : "none"}
                />
            </button>

            <button
                className={`action-btn cart-btn ${isInCart ? 'active' : ''}`}
                onClick={(e) => onCartClick(e, item)}
                title={isInCart ? "Remove from cart" : "Add to cart"}
                aria-label={isInCart ? "Remove from cart" : "Add to cart"}
            >
                <ShoppingCart size={20} />
                {isInCart && <span className="cart-check"><Check size={12} /></span>}
            </button>
        </div>
    );
};

export default ActionButtons;