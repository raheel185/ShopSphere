import React, { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const Collection = () => {

  const { products } = useState(ShopContext)
  const [showFilter, setShowfilter] = useState(false)

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      <div className='min-w-60'>
        <p onClick={()=>setShowfilter(prev=>!prev)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} />
        </p>

        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
           <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Men`} /> Men
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Women`} /> Women
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Kids`} /> Kids
                </p>
           </div>
        </div>

         {/* Sub Category filter */}
         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
           <p className='mb-3 text-sm font-medium'>TYPE</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Topwear`} /> Topwear
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Bottomwear`} /> Bottomwear
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Winterwear`} /> Winterwear
                </p>
           </div>
        </div>
        
      </div>

      {/* Right Side Section */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
        </div>

      </div>


    </div>
  )
}

export default Collection
