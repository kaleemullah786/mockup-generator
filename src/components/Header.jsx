'use client'
import { useSession, signOut } from "next-auth/react"
import Logo from '../../public/assets/Logo.svg'
import Image from "next/image"
import { SearchContext } from "../context/SearchContext"
import { useContext } from "react"
const Header = () => {
  const { data: session } = useSession()
  const {dispatch}=useContext(SearchContext)
  return (
    <>
      <div className="h-[10vh] flex bg-gray-50 items-center px-4 justify-between">
        <Image src={Logo} width={100} height={'auto'} />
        {session && <div className="flex gap-4">
          {(localStorage.getItem('type') === 'user')&&
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500  " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search" className="p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50" placeholder="Search Mockups"
              onChange={(e)=>dispatch({type:'onChange',payload:e.target.value})} onKeyUp={()=>dispatch({type:'onKeyUp'})} />
          </div>}
          <button className="border-2 text-center border-black font-semibold text-sm rounded-md p-2" onClick={() => { signOut(); localStorage.removeItem('type') }}>Log out</button>
        </div>}
      </div>
    </>
  )
}

export default Header