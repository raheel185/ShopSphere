import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'


const useFetchProducts = (backendUrl) => {

    

    const [products, setproducts] = useState([])

    async function getData(){
        try {
            const response = await axios.get(backendUrl+'/api/product/list')
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
