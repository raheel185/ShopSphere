import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useFetchProducts from "../hooks/useFetchProducts";

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const {products_all} = useFetchProducts('http://localhost:3000/api/product/list')
    
    const [products, setProducts] = useState([])
    const currency = '$'
    const delivery_fee = 10
    const backendUrl = 'http://localhost:3000'
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null)

    const getCartAmount = () => {

        let amount = 0
        for(const items in cartItems){
            let itemData = products.find((x) => x._id === items)
            for(const item in cartItems[items]){
                let x = 0;
                if(cartItems[items][item] > 0){
                    x = itemData.price * cartItems[items][item]
                }
                amount += x 
            }
        }

        return amount;
    }

    const updateQuantity = async(itemId, size, quantity) => {

        let data = structuredClone(cartItems)
        data[itemId][size] = quantity
        setCartItems(data)

    }

    const addToCart = async (itemId, size) => {

        if(!size){
            toast.error('Select Product Size')
            return
        }

        let cartData = structuredClone(cartItems)
        
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        setCartItems(cartData)
    }

    const getCartQuantity = () => {

        let quantity_ = 0

        for(let items in cartItems){
            for(let item in cartItems[items]){
                if(cartItems[items][item] > 0){
                    quantity_ += cartItems[items][item]
                }
            }
        }

        return quantity_;

    }
 

    useEffect(()=>{

        setProducts(products_all)

    },[products_all])

    useEffect(()=>{
        
        

    },[cartItems])

    useEffect(()=>{

        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }

    },[])

    const value = { products, currency, delivery_fee, search, showSearch, setSearch, 
                    setShowSearch, cartItems, addToCart, getCartQuantity, updateQuantity, 
                    getCartAmount, navigate, backendUrl, token, setToken, setCartItems }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;