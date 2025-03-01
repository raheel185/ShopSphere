import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Product = () => {

  const {productId} = useParams()
  const {products} = useContext(ShopContext)

  const [product, setProduct] = useState(false)
  const [image, setImage] = useState(false)

  const fetchProduct = async()=>{

    products.filter((item)=>{
      if(item._id == productId){
        setProduct(item)
        setImage(item.image[0])
        return null
      }
     
    })
   
    // products.map((item)=>{
    //   if(item._id == productId){
    //     setProduct(item)
    //     console.log(item)
    //     return null
    //   }
    // })

  }

  useEffect(()=>{

    fetchProduct()

  },[productId, products])

  return (
    <div>
      {productId}
    </div>
  )
}

export default Product
