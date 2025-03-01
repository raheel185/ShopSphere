import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const RelatedProducts = ({category, subCategory}) => {

    const {products} = useContext(ShopContext)
    const [related,setRelated] = useState([])

    useEffect(()=>{

        if(products.length){
            let prdCopy = products.slice()
            prdCopy = prdCopy.filter(item => item.category === category)
            prdCopy = prdCopy.filter(item => item.subCategory === subCategory)

            prdCopy = prdCopy.slice(0,5)
            setRelated(prdCopy)
        }

    },[products])

  return (
    <div className='mt-16'>
        <div className='py-2 text-center text-3xl'>
            <Title text1={'RELATED'} text2={'PRODUCTS'} />
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
            {
              related.map((item, index)=>(
                  <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
              ))
            }
        </div>
      
    </div>
  )
}

export default RelatedProducts
