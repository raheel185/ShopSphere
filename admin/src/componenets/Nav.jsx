import React from 'react'
import {assets} from '../assets/assets'

const Nav = () => {
  return (
    <div>
        <img src={assets.logo}/>
        <button>Logout</button>
    </div>
  )
}

export default Nav
