import { useCallback, useEffect, useState } from "react";
import {products as localProducts} from "../assets/assets";
import { toast } from 'react-toastify';
import { ShopContext } from './ShopContextValue';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const ShopContextProvider = (props)=>{
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const [newsletterSubscribed, setNewsletterSubscribed] = useState(
        () => Boolean(localStorage.getItem('newsletterEmail'))
    );

    const subscribeNewsletter = (email) => {
        localStorage.setItem('newsletterEmail', email);
        setNewsletterSubscribed(true);
    };

    const addToCart = async (itemId, size)=>{
        if(!size){
            toast.error("Please select a size");
            return;
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        toast.success('Added to cart');

        if(token){    
            try{
                await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}})
            }catch(error){
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                totalCount += cartItems[items][item];
            }
        }
        return totalCount;         
    }

    const updateQuantity = async (itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if(token){    
            try{
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}})
            }catch(error){
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                const product = products.find((prod)=> prod._id === items);
                if(product){
                    totalAmount += product.price * cartItems[items][item];
                }
            }
        }
        return totalAmount;
    }

    const getNewsletterDiscount = () => newsletterSubscribed ? getCartAmount() * 0.2 : 0;


    const getProductData = useCallback(async()=>{
        try{
            const response = await axios.get(backendUrl + '/api/product/list');
            const apiProducts = response.data.success && Array.isArray(response.data.products)
                ? response.data.products
                : [];
            const localImageNames = new Set(
                localProducts.flatMap((product) => product.image || []).map((image) => image.split('/').pop())
            );
            const addedProducts = apiProducts.filter((product) => {
                const imageNames = (product.image || []).map((image) => image.split('/').pop());
                return !imageNames.some((imageName) => localImageNames.has(imageName));
            });
            setProducts([...localProducts, ...addedProducts]);
        }catch(error){
            console.error('Unable to load products from the API:', error.message);
            setProducts(localProducts);
        }
    }, [backendUrl]);

    const getUserCart = useCallback(async (token)=>{
        try{
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}});
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        }catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }, [backendUrl]);

    const getUserProfile = useCallback(async (userToken)=>{
        try{
            const payload = JSON.parse(atob(userToken.split('.')[1]));
            setUser({
                _id: payload.id,
                name: 'My Profile',
                email: 'Email unavailable'
            });
        }catch{
            setUser({name: 'My Profile', email: 'Profile unavailable'});
        }
        try{
            const response = await axios.get(backendUrl + '/api/user/profile', {headers: {token: userToken}});
            if(response.data.success){
                setUser(response.data.user);
            }
        }catch(error){
            console.error('Unable to load user profile:', error.message);
            setUser((currentUser)=> currentUser ? {
                ...currentUser,
                email: currentUser.email
            } : {name: 'My Profile', email: 'Email unavailable'});
        }
    }, [backendUrl]);
    useEffect(()=>{
        getProductData()
    }, [getProductData])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            const savedToken = localStorage.getItem('token');
            setToken(savedToken)
            getUserCart(savedToken)
            getUserProfile(savedToken)
        }
    },[token, getUserCart, getUserProfile])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, getNewsletterDiscount, navigate, backendUrl,
        newsletterSubscribed, subscribeNewsletter,
        setToken, token, user, setUser, getUserProfile
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;