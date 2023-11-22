'use client';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect,useContext } from "react";
import Image from "next/image";
import uploadIcon from '../../../../public/assets/icons/UUpload.svg'
import deleteIcon from '../../../../public/assets/icons/delete-2-svgrepo-com.svg'
import editIcon from '../../../../public/assets/icons/edit-white.svg'
import leftArrow from '../../../../public/assets/icons/back-arrow.svg'
import Link from "next/link";
import {PropsContext} from "../../../context/PropsContext"
const page = () => {
  const router = useRouter()
  const [mockups, setMockups] = useState(null)
  const [filtered, setFiltered] = useState(null)
  const [category, setCategory] = useState('Category')
  const [range, setRange] = useState(0)
  const {dispatch}=useContext(PropsContext)
  const { data: session } = useSession(
    {
      required: true,
      onUnauthenticated() {
        router.replace('/admin/signin')
      }
    }
  )
  const handleSearch = (e) => {
    if (category === 'Category')
      setFiltered(mockups.filter(element => element.name.toLowerCase().includes(e.target.value.toLowerCase())))
    else
      setFiltered(mockups.filter(element => element.name.toLowerCase().includes(e.target.value.toLowerCase()) && element.category.toLowerCase() === category.toLowerCase()))
  }
  const handleCategory = (e) => {
    setCategory(e.target.value)
    if (e.target.value === 'Category')
      setFiltered(mockups)
    else
      setFiltered(mockups.filter(element => element.category.toLowerCase() === e.target.value.toLowerCase()))
  }
  const handleDelete = (id) => {
    fetch('/api/mockup/' + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => setFiltered(filtered.filter(element => element._id !== res.mockup._id)))
  }
  useEffect(() => {
    if (!mockups) {
      fetch('/api/mockups')
      .then(res => res.json())
      .then(data => {
        setMockups(data.mockups)
        setFiltered(data.mockups)
      })
    }
  })

  if (session)
    if (localStorage.getItem('type') === 'admin')
      return (
        <div className="relative overflow-x-auto shadow-md p-4 sm:rounded-lg mb-2 mx-4">
          <div className="flex items-center justify-between pb-4">
            <h1 className=" font-bold text-lg">Mockups Lists</h1>
            <div className="flex gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500  " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="table-search" className="p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50" placeholder="Search for items"
                  onChange={handleSearch} />
              </div>

              <select className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50" value={category} onChange={handleCategory} name="Category" id="Category">
                < option value="Category">Category</ option>
                < option value="Laptop">Laptop</ option>
                < option value="Mobile">Mobile</ option>
                < option value="Electronics">Electronics</ option>
              </select>
              <button onClick={() => router.push('/admin/mockups/upload')} className="flex bg-black text-white py-1 px-2 text-sm gap-1 items-center rounded-lg"><Image src={uploadIcon} />Upload Mockup</button>
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded" />
                    <label for="checkbox-all-search" className="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Mockups
                </th>

                <th scope="col" className="px-6 py-3">
                  Category
                </th>

                <th scope="col" className="px-6 py-3 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered?.slice(range, range + 10).map((mockup) =>
                <tr key={mockup._id} className="bg-white border-b  hover:bg-gray-50 ">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded" />
                      <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <th scope="row" className="flex items-center gap-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                    {mockup.name}"
                  </th>

                  <td className="px-6 py-4">
                    {mockup.category}
                  </td>

                  <td className="px-6 py-4 flex gap-2 justify-end">
                    <button className="border border-black rounded-md p-1"><Image src={deleteIcon} width={20} height={20} onClick={() => handleDelete(mockup._id)} /></button>
                    <Link onClick={() => dispatch({type:'setProps',payload:{...mockup}})} href='/admin/mockups/edit' className="flex gap-1 bg-black text-white rounded-md py-1 px-2"><Image className="text-white fill-white" src={editIcon} width={20} height={20} />Edit</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex gap-4 mt-4 mr-8 justify-end">
            <button onClick={() => setRange(range >= 10 ? range - 10 : range)}><Image src={leftArrow} /></button>
            <button onClick={() => setRange((range + 10) <= mockups?.length ? range + 10 : range)}><Image className="rotate-180" src={leftArrow} /></button>
            <p>Show <span className="font-semibold">{range + 1}</span> - <span className="font-semibold">{(range + 10) <= mockups?.length ? range + 10 : mockups?.length}</span> of <span className="font-semibold">{mockups?.length}</span></p>
          </div>
        </div>

      )
    else
      return (
        <div>Access denied! Kindly login as Admin</div>
      )
}

export default page