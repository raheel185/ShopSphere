import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'


const Product = () => {

  const {productId} = useParams()
  const {products, currency, addToCart} = useContext(ShopContext)

  const [productdata, setProduct] = useState(false)
  const [image, setImage] = useState(false)
  const [size, setSize] = useState('')

  const fetchProduct = async()=>{

    products.filter((item)=>{
      if(item._id == productId){
        setProduct(item)
        setImage(item.image[0])
        return null
      }
    })

  }

  useEffect(()=>{

    fetchProduct()

  },[productId, products])

  return productdata ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

            <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {
                          productdata.image.map((item,index)=>(
                            <img onClick={()=>setImage(item)} src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                          ))
                        }
                </div>
                <div className='w-full sm:w-[80%]'>
                        <img src={image} className='w-full h-auto' alt="" />
                </div>
            </div>

            <div className='flex-1'>
                  <h1 className='font-medium text-2xl mt-2'>
                        {productdata.name}
                  </h1>
                  <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt='' className='w-3 5' />
                        <img src={assets.star_icon} alt='' className='w-3 5' />
                        <img src={assets.star_icon} alt='' className='w-3 5' />
                        <img src={assets.star_icon} alt='' className='w-3 5' />
                        <img src={assets.star_dull_icon} alt='' className='w-3 5' />
                        <p className='pl-2'>(122)</p>
                  </div>
                  <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
                  <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
                  <div className='flex flex-col gap-4 my-8'>
                        <p>Select Size</p>
                        <div className='flex gap-2'>
                            {
                              productdata.sizes.map((item,index)=>(
                                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item == size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                              ))
                            }
                        </div>
                  </div>
                  <button onClick={()=>addToCart(productdata._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
                  <hr className='mt-8 sm:w-4/5' />
                  <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                            <p>100% Original product.</p>
                            <p>Cash on delivery is available on this product.</p>
                            <p>Easy return and exchange policy within 7 days.</p>
                  </div>
            </div>
        </div>

        {/* Description and Review */}
        <div className='mt-20'>
            <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum cumque quidem delectus ut inventore, maxime placeat tempora autem quas repellendus dolorum esse incidunt sint quaerat odit ipsa possimus laudantium? Ipsam quidem doloribus possimus perspiciatis voluptatem, a amet reprehenderit nobis! Illum et dignissimos autem sit magnam. Facilis, et id. Repudiandae earum aperiam, magni voluptatibus omnis unde?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim voluptatibus modi non nesciunt atque voluptate dolorum omnis illo quis porro inventore provident hic tenetur expedita, quidem exercitationem odit numquam reprehenderit velit ab. Et dolore animi fuga, culpa rerum incidunt deleniti?</p>
            </div>
        </div>

        <RelatedProducts category={productdata.category} subCategory={productdata.subCategory} />
             
    </div>
  ): <div className='opacity-0'></div>
}

export default Product
