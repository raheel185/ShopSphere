import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] border-r-2 min-h-screen border-gray-200'>

        <div className='flex flex-col gap-4 pl-[20%] pt-6 text-[15px]'>
            
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/add" >
                <img src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/list" >
                <img src={assets.order_icon} alt="" />
                <p className='hidden md:block'>List Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/orders" >
                <img src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>

        </div>
      
    </div>
  )
}

export default Sidebar
