import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {

  const {cartItems, products, currency, updateQuantity} = useContext(ShopContext)
  const [cartdata, setcartdata] = useState([])

  useEffect(()=>{

    let data = []

    for(let items in cartItems){
      let cur_id = items
      for(let item in cartItems[items]){
        let size = item
        let quantity = cartItems[items][item]

        let cur_data = {
          _id:cur_id,
          size:size,
          quantity:quantity
        }
        data.push(cur_data)
      }
    }

    setcartdata(data)

  },[cartItems])

  return (
    <div className='border-t pt-14'>
        <div className='text-2xl mb-3'>
            <Title text1={'YOUR'} text2={'CART'} />
        </div>
           
        <div>
            {
              cartdata.map((item,index)=>{
                
                var cur_product = products.find(x=> x._id === item._id)
                
                return item.quantity > 0 ? (
                  <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                      <div className='flex items-start gap-6'>
                          <img src={cur_product.image[0]} className='w-16 sm:w-20' />
                          <div>
                            <p className='text-xs sm:text-lg font-medium'>{cur_product.name}</p>
                              <div className='flex items-center gap-5 mt-2'>
                                  <p>{currency}{cur_product.price}</p>
                                  <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50s'>{item.size}</p>
                              </div>
                          </div>
                      </div>
                      <input onChange={(e)=>updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                      <div>
                          <img onClick={()=>updateQuantity(item._id, item.size, 0)} className='w-4 sm:w-5 cursor-pointer mr-4' src={assets.bin_icon} />
                      </div>
                  </div>
                ): null

              })
            }
        </div>

        <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
                <CartTotal />
            </div>
        </div>

    </div>
  )
}

export default Cart
