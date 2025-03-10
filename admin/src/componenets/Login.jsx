import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = ({settoken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) =>{
    event.preventDefault()
      try {
        const res = await axios.post('http://localhost:3000/api/user/admin', {
            email,password})

        const data = await res.data

        if(data.status){
          console.log('Succesfully logged in')
          console.log(data)
          settoken(data.token)
        }else{
          toast.error(data.message)
        }
        

      } catch (error) {
        toast.error(error.message)
      }
  }

  return (
    <div className='flex align-center justify-center min-h-screen'>
    <form onSubmit={onSubmitHandler} className='min-w-[400px] flex flex-col items-center sm:max-w-96 m-auto gap-4 text-gray-800 bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <div className='inline-flex items-center gap-2 mb-2 mt-8'>
            <p className='text-3xl font-bold'>Admin Panel</p>
        </div>
       
       
        <input onChange={(e)=>setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='abc@gmail.com' required />
        <input onChange={(e)=>setPassword(e.target.value)} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter your password' required/>

        <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p className='cursor-pointer'>Forgot your password?</p>
        </div>

        <button className='bg-black text-white font-light px-8 py-2 mt-4 mb-8'>
        Login
        </button>
    </form>
    </div>
  )
}

export default Login
