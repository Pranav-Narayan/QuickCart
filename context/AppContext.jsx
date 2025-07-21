'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, useCallback, act } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = ({ children, userName, userId, Email }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [userData, setUserData] = useState(false)

    const [products, setProducts] = useState([])
    const [wishlistItems, setWishlistItems] = useState([])
    const [isSeller, setIsSeller] = useState(true)
    const [cartItems, setCartItems] = useState([])
    const [shippingAddress, setShippingAddress] = useState([])

    const [buyProduct, setBuyproduct] = useState()
    const [buyQuantity, setBuyQuantity] = useState(1)
    const [buyTotalprice, setBuyTotal] = useState(0)

    // Authentication form 
    const onLogin = () => {
        setShowLogin(!showLogin)
    }

    const onSignup = () => {
        setShowSignup(!showSignup)
    }

    const fetchUserData = async () => {
        if (!Email) {
            return
        }
        try {
            const response = await axios.post('/api/userData', { Email })
            const userInfo = response.data.Data
            setUserData(userInfo)
            router.refresh();
        } catch (error) {
            console.log("Error User data fetching")
        }

    }

    const fetchWishlistData = async () => {
        if (!Email) return;

        try {
            const res = await axios.post('/api/userData', { Email });
            const data = res.data.Data;
            setWishlistItems(data?.WishList);
        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
        }
    };


    const fetchProductData = async () => {
        setProducts(productsDummyData)
    }

    const fetchShippingAddress = async () => {
        try {
            const response = await axios.post('/api/userData', { Email })
            const UserShippingAddress = response.data.Data.ShippingAddress
            setShippingAddress(UserShippingAddress)
        } catch (error) {
            console.log("Error in FetchShipping Address::", error)
        }
    }

    const addToCart = async (itemId) => {

        try {
            axios.post('/api/cart/addtocart', { itemId, Email })
            toast.success("Added to cart")
        } catch (error) {
            console.log("Error in AddToCart")
            toast.error("Please try again")
        }
    }
    const fetchCartData = async () => {
        try {
            const response = await axios.post('/api/userData', { Email })
            const cartitem = response.data.Data.CartList
            setCartItems(cartitem || [])
        } catch (error) {
            console.log("Error in FetchShipping Address::", error)
            setCartItems([]);
        }
    }

    const removeCartItem = useCallback(async (itemId) => {
        try {
            await axios.post('/api/cart/removefromcart', { itemId, Email });
            toast.success('Removed From Cart');
            await fetchCartData();
        } catch (error) {
            console.log('Error in Remove item from cart', error);
            toast.error('Please try again');
        }
    }, [Email, fetchCartData]);



    const BuyNow = async (ItemId) => {
        const product = products.find(item => item._id === ItemId);
        setBuyTotal(product.offerPrice * buyQuantity)
        setBuyproduct(product)
    }
    const removeBuyProduct = (itemId) => {
        setBuyproduct(null)
    }
    const updateBuyQuantity = async (actionOrValue) => {
        let value = buyQuantity;
        
        if (actionOrValue === 'increment') {
            value = buyQuantity + 1;
        } else if (actionOrValue === 'decrement') {
            if (buyQuantity > 1) {
                value = buyQuantity - 1;
            }
        } else if (typeof actionOrValue === 'number') {
            value = actionOrValue > 0 ? actionOrValue : 1;
        }

        setBuyQuantity(value);

        if (buyProduct) {
            setBuyTotal(value * buyProduct.offerPrice);
        }
    };
    
    const updateCartProductQuantity = async (itemId, action) => {
        try {
            await axios.post('/api/cart/CartProductCount', { Email, itemId, action })
            await fetchCartData();
        } catch (error) {
            console.log("Error in Product count Update")
        }

    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [Email])



    const value = {
        showLogin, showSignup,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        userName, userId, Email, shippingAddress, BuyNow, fetchShippingAddress,
        onLogin, onSignup, wishlistItems, fetchWishlistData, buyProduct, removeBuyProduct,
        buyQuantity, updateBuyQuantity, buyTotalprice, fetchCartData, removeCartItem, updateCartProductQuantity
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}