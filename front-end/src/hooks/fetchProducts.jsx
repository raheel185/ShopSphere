import React, { useContext, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'


const fetchProducts = () => {

    const {backendUrl} = useContext(ShopContext)

    const [products, setproducts] = useState('Lorem Ipsum Dolor')

    async function getData(){
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)
        } catch (error) {
            
        }
    }

  return {products}
}

export default fetchProducts
