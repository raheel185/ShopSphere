import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const useFetchProducts = (backendUrl) => {

    const [products_all, setproducts] = useState([])

    

    useEffect(()=>{
        async function getData(){
            try {
                const response = await axios.get(backendUrl)
                const data = response.data.products
                console.log(data)
                setproducts(data)
            } catch (error) {
                console.log(error.message)
            }
        }

        getData()
    },[])

  return {products_all}
}

export default useFetchProducts
