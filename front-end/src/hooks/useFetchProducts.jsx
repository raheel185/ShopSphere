import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'


const useFetchProducts = () => {

    const {backendUrl} = useContext(ShopContext)

    const [products, setproducts] = useState([])

    async function getData(){
        try {
            const response = await axios.get('http://localhost:3000/api/product/list')

            const data = response.data.products
            setproducts(data)

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getData()
    },[])

  return {products}
}

export default useFetchProducts
