import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Verify = () => {

    const {navigate, token, setCartItems} = useContext(ShopContext)

    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    async function verifyPayment(){

        if(!token){
            return null
        }

        try {
            const response = await axios.post('http://localhost:3000/api/order/verify',{success, orderId}, {headers:{token}})
            if(response.data.status){
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

    return (
    <div>
      
    </div>
  )
}

export default Verify
