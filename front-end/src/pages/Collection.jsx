import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products } = useContext(ShopContext)

  const {search, showSearch} = useContext(ShopContext)

  const [showFilter, setShowfilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setcategory] = useState([])
  const [subcategory, setsubcategory] = useState([])
  const [sorttype, setsorttype] = useState('relavent')

  
  const toggleCategory = (e) => {

      if(category.includes(e.target.value)){
        setcategory(prev => prev.filter(item => item !== e.target.value))
      }
      else{
        setcategory(prev => [...prev,e.target.value])
      }
  }

  const toggleSubCategory = (e) => {

      if(subcategory.includes(e.target.value)){
          setsubcategory(prev => prev.filter(item => item !== e.target.value))
      }
      else{
          setsubcategory(prev => [...prev, e.target.value])
      }
  }

  const applyFilter = () => {

      let productCopy = products.slice()

      if(category.length > 0){
          productCopy = productCopy.filter(item => category.includes(item.category))
      }

      if(subcategory.length > 0){
          productCopy = productCopy.filter(item => subcategory.includes(item.subCategory))
      }

      if(showSearch && search.length>=1){
         productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      }

      setFilteredProducts(productCopy)

  }

  const sortData = () => {

    let fpCopy = filteredProducts.slice()

    switch (sorttype) {
      case 'low-high':
        setFilteredProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
        break;
      case 'high-low':
          setFilteredProducts(fpCopy.sort((a,b)=>(b.price - a.price)))
          break;
      default:
        applyFilter()
        break;
    }

  }

    useEffect(()=>{
      sortData()
    },[sorttype])

    useEffect(()=>{
      applyFilter()
    },[subcategory, category, search, showSearch, products])

    useEffect(()=>{
      setFilteredProducts(products)
    },[products])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      <div className='min-w-60'>
        <p onClick={() => setShowfilter(prev=>!prev)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} />
        </p>

        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
           <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Men`} onChange={toggleCategory} /> Men
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Women`} onChange={toggleCategory} /> Women
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Kids`} onChange={toggleCategory} /> Kids
                </p>
           </div>
        </div>

         {/* Sub Category filter */}
         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
           <p className='mb-3 text-sm font-medium'>TYPE</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Topwear`} onChange={toggleSubCategory} /> Topwear
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Bottomwear`} onChange={toggleSubCategory} /> Bottomwear
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={`Winterwear`} onChange={toggleSubCategory} /> Winterwear
                </p>
           </div>
        </div>
        
      </div>

      {/* Right Side Section */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            {/* Product Sort */}
            <select onChange={(e)=>setsorttype(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                <option value="relavent">Sort by: Relavent</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
            </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filteredProducts.map((item, index)=>(
                  <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
              ))
            }
        </div>

      </div>


    </div>
  )
}

export default Collection
