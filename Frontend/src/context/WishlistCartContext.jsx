import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistCartContext = createContext();

export const useWishlistCart = () => {
    const context = useContext(WishlistCartContext);
    if (!context) {
        throw new Error('useWishlistCart must be used within WishlistCartProvider');
    }
    return context;
};

// Helper to extract numeric rating
const extractRating = (item) => {
    const rawRating = item.rating || item.content?.rating || 4.5;
    if (typeof rawRating === 'object' && rawRating !== null) {
        return rawRating.average || 4.5;
    }
    return Number(rawRating) || 4.5;
};

// Unique ID fallback (only used if item.id is missing)
let idCounter = 0;
const generateId = () => `temp-${Date.now()}-${idCounter++}`;

const formatItemForWishlistCart = (item) => {
    // Ensure we always have a unique ID
    const safeId = item.id || generateId();

    // Extract price
    let price = '$0';
    let numericPrice = 0;

    if (item.price) {
        price = item.price;
        numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, '')) || 0;
    } else if (item.content?.price) {
        price = item.content.price;
        numericPrice = parseFloat(item.content.price.replace(/[^0-9.-]+/g, '')) || 0;
    } else if (item.originalPrice) {
        price = `$${item.originalPrice}`;
        numericPrice = item.originalPrice;
    }

    return {
        id: safeId,
        title: item.title || item.name || 'Unknown Destination',
        name: item.title || item.name || 'Unknown Destination',
        image: item.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: price,
        originalPrice: numericPrice,
        rating: extractRating(item),  // ✅ always a number
        type: item.type || item.content?.type || 'destination',
        location: item.content?.location || item.location || item.title,
        country: item.content?.country || 'International',
        countryCode: item.content?.countryCode || 'WW',
        duration: item.content?.duration || item.duration || '7 Days',
        description: item.description || item.content?.details || `Explore ${item.title || 'this destination'}`
    };
};

export const WishlistCartProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        const savedCart = localStorage.getItem('cart');

        setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
        setCart(savedCart ? JSON.parse(savedCart) : []);
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: wishlist.length }));
        }
    }, [wishlist, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('cart', JSON.stringify(cart));
            window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart.length }));
        }
    }, [cart, isInitialized]);

    const isInWishlist = (itemId) => wishlist.some(item => item.id === itemId);
    const isInCart = (itemId) => cart.some(item => item.id === itemId);

    const toggleWishlist = (e, item) => {
        e.preventDefault();
        e.stopPropagation();

        const formattedItem = formatItemForWishlistCart(item);

        if (isInWishlist(item.id)) {
            setWishlist(prev => prev.filter(w => w.id !== item.id));
            showNotification('Removed from wishlist', 'warning');
            return false;
        } else {
            setWishlist(prev => [...prev, formattedItem]);
            showNotification('Added to wishlist ❤️', 'success');
            return true;
        }
    };

    const toggleCart = (e, item) => {
        e.preventDefault();
        e.stopPropagation();

        const formattedItem = formatItemForWishlistCart(item);

        if (isInCart(item.id)) {
            setCart(prev => prev.filter(c => c.id !== item.id));
            showNotification('Removed from cart', 'warning');
            return false;
        } else {
            setCart(prev => [...prev, { ...formattedItem, quantity: 1 }]);
            showNotification('Added to cart 🛒', 'success');
            return true;
        }
    };

    const updateCartQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            setCart(prev => prev.filter(item => item.id !== itemId));
        } else {
            setCart(prev => prev.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const clearWishlist = () => setWishlist([]);
    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) =>
        total + (item.originalPrice || 0) * (item.quantity || 1), 0
    );

    const value = {
        wishlist,
        cart,
        isInWishlist,
        toggleWishlist,
        isInCart,
        toggleCart,
        updateCartQuantity,
        clearWishlist,
        clearCart,
        wishlistCount: wishlist.length,
        cartCount: cart.length,
        cartTotal,
        isInitialized
    };

    return (
        <WishlistCartContext.Provider value={value}>
            {children}
        </WishlistCartContext.Provider>
    );
};

const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `toast-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
};