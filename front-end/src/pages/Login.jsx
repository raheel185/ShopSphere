import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [currentState, setcurState] = useState('Login')

  const onSubmitHandler = async (event) => {

      event.preventDefault()

      try {
          if(currentState === 'Signup'){
              const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
              
              if(response.data.status){
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                toast.success(response.data.message)
              }else{
                toast.error(response.data.message)
              }

          }else{
            const response = await axios.post(backendUrl + '/api/user/login', {email, password})

              if(response.data.status){
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                toast.success(response.data.message)
              }else{
                toast.error(response.data.message)
              }
          }
      } catch (error) {
        toast.error(error.message)
      }

  }

  useEffect(()=>{

      if(token){
        navigate("/")
      }

  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        {
          currentState === 'Login' ? '' :  <input onChange={(e) => setName(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
        }
       
        <input onChange={(e)=>setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
        <input onChange={(e)=>setPassword(e.target.value)} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>

        <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p className='cursor-pointer'>Forgot your password?</p>
            {
              currentState === 'Login' ? <p onClick={() => setcurState('Signup')} className='cursor-pointer'>Create account</p> : <p onClick={() => setcurState('Login')} className='cursor-pointer'>Login</p>
            }
        </div>

        <button className='bg-black text-white font-light px-8 py-2 mt-4'>
          {
            currentState === 'Login' ? 'Sign In' : 'Sign Up'
          }
        </button>
    </form>
  )
}

export default Login
