'use client';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState,useContext } from "react";
import uploadIcon from '../../../../../public/assets/icons/UUpload.svg'
import Image from "next/image";
import Link from "next/link";
import {PropsContext} from '../../../../context/PropsContext'
const page = () => {
    const router = useRouter()
    const {dispatch}=useContext(PropsContext)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('Category')
    const [imgSrc, setImgSrc] = useState(null)
    const [img, setImg] = useState(null)
    const { data: session } = useSession(
        {
            required: true,
            onUnauthenticated() {
                router.replace('/admin/signin')
            }
        }
    )
    const handleImg = () => {
        const inp = document.getElementById("image")
        const [file] = inp.files
        if (file) {
            setImgSrc(URL.createObjectURL(file))
            setImg(file)
        }
    }
    if (session)
        if (localStorage.getItem('type') === 'admin')
            return (
                <>
                    <div className="w-full flex flex-col gap-8 min-h-screen h-auto bg-gray-100 lg:py-8 xl:p-0">
                        <div className="flex w-[90%] md:w-[45%] flex-col gap-8 m-auto">
                            <h1 className="text-lg lg:text-2xl font-bold text-center">Upload Mockup</h1>
                            <div className="gap-8 bg-white flex rounded-md shadow-sm p-8  w-full flex-col">
                                <div className="flex flex-col gap-4">
                                    <form className="flex flex-col gap-4">
                                        <label htmlFor="name" className="font-semibold">Mockup Name</label>
                                        <input required className="p-2 bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2" type="text" id="name" placeholder="Enter mockup name" value={name} onChange={(e) => setName(e.target.value)} />
                                        <label htmlFor="Category" className="font-semibold">Mockup Category</label>
                                        <select required className="p-2 bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2" value={category} onChange={(e) => setCategory(e.target.value)} name="Category" id="Category">
                                            < option value="Category" disabled>Category</ option>
                                            < option value="Laptop">Laptop</ option>
                                            < option value="Mobile">Mobile</ option>
                                            < option value="Electronics">Electronics</ option>
                                        </select>
                                        <label htmlFor="image" className="flex justify-center items-center cursor-pointer p-2 h-32 border-dotted bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2">
                                            <input required type="file" onChange={handleImg} accept=".png, .jpeg, .jpg .svg" id="image" hidden />
                                            <span className="flex gap-2 items-center"><Image src={uploadIcon} />Upload image</span>
                                        </label>
                                        <Link onClick={()=>dispatch({type:'setProps',payload:{name,category,img,imgSrc}})} className="p-2 bg-black text-white rounded-md font-semibold text-center" href='/admin/mockups/upload/new'>Upload</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        else
            return (
                <div>Access denied! Kindly login as Admin</div>
            )
}
export default page
