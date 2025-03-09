import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
        <Link className='d-flex' to="/">
        <img className='w-[max(10%,130px)]' src={assets.logo} alt="" />
        </Link>
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm '>Logout</button>
    </div>
  )
}

export default Nav
