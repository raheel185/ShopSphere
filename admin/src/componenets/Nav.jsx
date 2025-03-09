import React from 'react'
import {assets} from '../assets/assets'

const Nav = () => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm '>Logout</button>
    </div>
  )
}

export default Nav
