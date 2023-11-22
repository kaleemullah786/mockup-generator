'use client';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect, useContext } from "react";
import Card from '../../components/Card'
import Link from "next/link";
import { SearchContext } from "../../context/SearchContext";
import { PropsContext } from "../../context/PropsContext";

const page = () => {
  const router = useRouter()
  const { search, done } = useContext(SearchContext)
  const {dispatch}=useContext(PropsContext)
  const [mockups, setMockups] = useState(null)
  const [filtered, setFiltered] = useState(null)
  const [category, setCategory] = useState('Category')
  const { data: session } = useSession(
    {
      required: true,
      onUnauthenticated() {
        router.replace('/user/signin')
      }
    }
  )
  const handleCategory = (e) => {
    setCategory(e.target.value)
    if (e.target.value === 'Category')
      setFiltered(mockups)
    else
      setFiltered(mockups.filter(element => element.category.toLowerCase() === e.target.value.toLowerCase()))
  }
  async function getData() {
    {
      fetch('/api/mockups')
        .then(res => res.json())
        .then(data => {
          setMockups(data.mockups)
          setFiltered(data.mockups)
        })
    }
  }
  useEffect(() => {
    if (!mockups)
      getData()
    if (!done)
      if (category === 'Category')
        setFiltered(mockups?.filter(element => element.name.toLowerCase().includes(search?.toLowerCase())))
      else
        setFiltered(mockups?.filter(element => element.name.toLowerCase().includes(search?.toLowerCase()) && element.category.toLowerCase() === category.toLowerCase()))
  })

  if (session)
    if (localStorage.getItem('type') === 'user') {

      return (
        <>
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <h1 className="font-bold">Select your mockup</h1>
              <select className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50" value={category} onChange={handleCategory} name="Category" id="Category">
                < option value="Category">Category</ option>
                < option value="Laptop">Laptop</ option>
                < option value="Mobile">Mobile</ option>
                < option value="Electronics">Electronics</ option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered?.map(mockup =>
                <Link key={mockup._id} onClick={() => dispatch( {type:'setProps',payload:{ ...mockup }})} href='/user/create'>
                  <Card name={mockup.name} imgSrc={mockup.imgSrc} />
                </Link>
              )}

            </div>
          </div>
        </>
      )
    }
    else
      return (
        <div>Access denied! Kindly login as User</div>
      )
}

export default page