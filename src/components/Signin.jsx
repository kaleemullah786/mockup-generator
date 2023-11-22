'use client'
import Image from "next/image"
import facebook from '../../public/assets/icons/facebook.svg'
import google from '../../public/assets/icons/Google - Original.svg'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from 'react'
import { signIn } from "next-auth/react"

const Signin = () => {

  const path = usePathname()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  let routeType=null
  if(path.startsWith('/user'))
    routeType='user'
  else
  routeType='admin'

    const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(routeType, {
      redirect: false,
      email,
      password
    })
      .then((response) => {
        const {error}=response
        console.log(error)
        if(!error){
          localStorage.setItem('type',routeType)
        }
        setError(response)
        // router.replace('/'+routeType);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  
  return (
    <>
      <div className="w-full flex flex-col gap-8 min-h-screen h-auto bg-gray-100 lg:py-8 xl:p-0">
        {error && <p className="p-4 rounded-md shadow-md font-semibold text-white bg-red-300 absolute top-4 flex self-center transition-all">Sign in failed! Kindly check your credentials</p>}
        <div className="flex w-[90%] md:w-[45%] flex-col gap-8 m-auto">
            <h1 className="text-lg lg:text-2xl font-bold text-center">Sign in to your account</h1>
          <div className="gap-8 bg-white flex rounded-md shadow-sm p-8  w-full flex-col">
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="email" className="font-semibold">Email Address</label>
                <input required className="p-2 bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                {path.startsWith('/admin') && <><label htmlFor="password" className="font-semibold">Password</label>
                  <input required className="p-2 bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2" type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="*******"/>
                  <div className="text-end text-sm hover:text-blue-500 hover:cursor-pointer transition-all">Forgot Password?</div></>}
                <button className="p-2 bg-black text-white rounded-md font-semibold" type="submit">Sign in</button>
              </form>
              {path.startsWith('/user') && <><hr className="my-4 before:content-['OR'] text-center before:bg-white bg-black w-full before:px-2 before:relative border-t-2 overflow-visible before:mx-auto before:-top-3 before:text-[#888]" />
                <div className="flex flex-grow flex-col gap-2">
                  <button className="rounded-md p-2 flex items-center justify-center hover:bg-gray-100 border-gray-300 border-2 gap-2"><Image src={google} alt="google" />Sign in with Google</button>
                  <button className="rounded-md p-2 flex items-center justify-center hover:bg-gray-100 border-gray-300 border-2 gap-2"><Image src={facebook} alt="facebook" />Sign in with Facebook</button>
                </div></>}
            </div>
          </div>
          {path.startsWith('/user') && <p className="text-center">Don't have an account? <Link href='/user/signup' className="font-semibold underline">Sign up</Link></p>}
        </div>
      </div>
    </>
  )
}

export default Signin