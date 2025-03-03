import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import {ToastContainer, toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom' 

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = '$'
    const delivery_fee = 10

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()

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
        
        console.log('Cart Items 000: ',cartItems)

    },[cartItems])

    const value = { products, currency, delivery_fee, search, showSearch, setSearch, 
                    setShowSearch, cartItems, addToCart, getCartQuantity, updateQuantity, 
                    getCartAmount, navigate }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;