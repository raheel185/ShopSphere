import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import {ToastContainer, toast} from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = '$'
    const delivery_fee = 10

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})

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
                    setShowSearch, cartItems, addToCart, getCartQuantity, updateQuantity }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;