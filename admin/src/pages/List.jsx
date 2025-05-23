import { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

const List = ({token}) => {

  const [list, setList] = useState([])
  
  async function fetchProducts(){
      try {
        
        const response = await axios.get('http://localhost:3000/api/product/list')
        
        if(response.data.status){
          setList(response.data.products)
        }

      } catch (error) {
        console.log(error)
      }
  }
  
  async function removeProduct(id){
    try {
      const response = await axios.delete(`http://localhost:3000/api/product/delete/${id}`, {headers:{token}})
      if(response.data.status){
        setList(prev => prev.filter(item => item._id !== id))
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchProducts() 
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
  <thead className="bg-gray-100 border-b">
    <tr>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 w-[350px]">Name</th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
    </tr>
  </thead>
  <tbody>
   {
   list.length > 0 ?  list.map((item, index) => (
      <tr key={index} className="border-b">
    <td className="px-6 py-4"><img src={item.image[0]} alt="Product" className="w-12 h-12 rounded" /></td>
    <td className="px-6 py-4 text-gray-900 w-[350px]">{item.name}</td>
    <td className="px-6 py-4 text-gray-600">{item.category}</td>
    <td className="px-6 py-4 text-gray-800 font-semibold">${item.price}</td>
    <td className="px-6 py-4">
      {/* <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Edit</button> */}
      <button onClick={() => removeProduct(item._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition ml-2">Delete</button>
    </td>
  </tr>
    )) : null
   }
  </tbody>
</table>
      </div>
    </>
  )
}

export default List
