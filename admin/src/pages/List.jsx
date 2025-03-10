import { useEffect, useState } from 'react'
import axios from 'axios'

const List = () => {

  const [list, setList] = useState([])
  
  async function fetchProducts(){
      try {
        
        const response = await axios.get('http://localhost:3000/api/product/list')
        
        if(response.data.status){
          setList(response.data.products)
        }

      } catch (error) {
        
      }
  }

  useEffect(()=>{
    fetchProducts() 
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div>
      <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
  <thead class="bg-gray-100 border-b">
    <tr>
      <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
      <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 w-[350px]">Name</th>
      <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
      <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
      <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
    </tr>
  </thead>
  <tbody>
   
   {
    list.length > 0 ?  list.map((item, index) => (
      <tr key={index} class="border-b">
    <td class="px-6 py-4"><img src="" alt="Product" class="w-12 h-12 rounded" /></td>
    <td class="px-6 py-4 text-gray-900 w-[350px]">{item.name}</td>
    <td class="px-6 py-4 text-gray-600">{item.category}</td>
    <td class="px-6 py-4 text-gray-800 font-semibold">${item.price}</td>
    <td class="px-6 py-4">
      <button class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Edit</button>
      <button class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition ml-2">Delete</button>
    </td>
  </tr>
    )) : ''
   }
    
  </tbody>
</table>

      </div>
    </>
  )
}

export default List
