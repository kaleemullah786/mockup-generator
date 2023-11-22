'use client';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import facebook from '../../../../public/assets/icons/facebook.svg'
import google from '../../../../public/assets/icons/Google - Original.svg'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from 'react'
const page = () => {

    const { data: session } = useSession()
    const router = useRouter()
    const path = usePathname()
    const [email, setEmail] = useState('')
    const [error, setMsg] = useState(false)

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signIn('email', {
            redirect: false,
            email
        })
            .then((response) => {
                const { error } = response
                console.log(response)
                if (!error) {
                    localStorage.setItem('type', 'user')
                    setMsg(true)
                }
                // router.replace('/'+routeType);
            })
            .catch((error) => {
                // console.log(error);
            });
    };

    if (!session)
        return (
            <>
                <div className="w-full flex flex-col gap-8 min-h-screen h-auto bg-gray-100 lg:py-8 xl:p-0">
                    {error && <p className="p-4 rounded-md shadow-md font-semibold text-white bg-green-300 absolute top-4 flex self-center transition-all">Success! Kindly check your inbox</p>}
                    <div className="flex w-[90%] md:w-[45%] flex-col gap-8 m-auto">
                        <h1 className="text-lg lg:text-2xl font-bold text-center">Create your account</h1>
                        <div className="gap-8 bg-white flex rounded-md shadow-sm p-8  w-full flex-col">
                            <div className="flex flex-col gap-4">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <label htmlFor="email" className="font-semibold">Email Address</label>
                                    <input required className="p-2 bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                        
                                    <button className="p-2 bg-black text-white rounded-md font-semibold" type="submit">Sign up</button>
                                </form>
                                <hr className="my-4 before:content-['OR'] text-center before:bg-white bg-black w-full before:px-2 before:relative border-t-2 overflow-visible before:mx-auto before:-top-3 before:text-[#888]" />
                                    <div className="flex flex-grow flex-col gap-2">
                                        <button className="rounded-md p-2 flex items-center justify-center hover:bg-gray-100 border-gray-300 border-2 gap-2"><Image src={google} alt="google" />Sign in with Google</button>
                                        <button className="rounded-md p-2 flex items-center justify-center hover:bg-gray-100 border-gray-300 border-2 gap-2"><Image src={facebook} alt="facebook" />Sign in with Facebook</button>
                                    </div>
                            </div>
                        </div>
                         <p className="text-center">Already have an account? <Link href='/user/signin' className="font-semibold underline">Sign in</Link></p>
                    </div>
                </div>
            </>
        )
    router.replace('/user')
}

export default page