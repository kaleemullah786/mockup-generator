'use client';
import { useState, useEffect ,useContext} from "react";
import Image from "next/image";
import { Rnd } from "react-rnd";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {PropsContext} from "../../../../context/PropsContext"

export default function Home() {
    const router = useRouter()
    const {props}=useContext(PropsContext)
    const [preview, setPreview] = useState(false)
    const [properties, setProperties] = useState({
        perspective: props?.overlay?.perspective,
        rotateX: props?.overlay?.rotateX,
        rotateY: props?.overlay?.rotateY,
        border_radius: props?.overlay?.borderRadius
    })

    const { data: session } = useSession(
        {
            required: true,
            onUnauthenticated() {
                router.replace('/admin/signin')
            }
        }
    )
    const handlePerspective = (e) => {
        setProperties({ ...properties, perspective: e.target.value })
    }
    const handleRotateX = (e) => {
        setProperties({ ...properties, rotateX: e.target.value })
    }
    const handleRotateY = (e) => {
        setProperties({ ...properties, rotateY: e.target.value })
    }
    const handleBorderRadius = (e) => {
        setProperties({ ...properties, border_radius: e.target.value })
    }

    useEffect(() => {
        if (props._id && session) {
            const frame = document.getElementsByClassName('frame')[0]
            const overlay = document.getElementsByClassName('overlay')[0]
            frame.style.width = props.frame.width + 'px'
            frame.style.height = props.frame.height + 'px'
            frame.style.top = props.frame.top + 'px'
            frame.style.left = props.frame.left + 'px'
            if (properties.perspective !== '0')
                frame.style.perspective = properties.perspective + 'px'
            overlay.style.transform = `rotateX(${properties.rotateX}deg) rotateY(${properties.rotateY}deg)`
            overlay.style.borderRadius = `${properties.border_radius}%`
        }
    })
    const saveMockup = (e) => {
        e.preventDefault()
        const frame = document.getElementsByClassName('frame')[0].getBoundingClientRect()
        const box = document.getElementsByClassName('box')[0].getBoundingClientRect()

        const frameData = {
            top: frame.top - box.top,
            left: frame.left - box.left,
            width: frame.width,
            height: frame.height
        }
        const overlayData = {
            perspective: properties.perspective,
            borderRadius: properties.border_radius,
            rotateX: properties.rotateX,
            rotateY: properties.rotateY
        }

        fetch('/api/mockup', {
            method: "PUT",
            body: JSON.stringify({ ...props, frame: { ...frameData }, overlay: { ...overlayData } })
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }
    if (session)
        if (localStorage.getItem('type') === 'admin')
            if (props._id)
                return (
                    <>
                        <div className="min-h-[90vh] bg-gray-100  grid grid-cols-4">
                            <div className="col-span-4 md:col-span-3 flex justify-center items-center overflow-hidden">
                                <div className="box relative" >
                                    {props&&<Image className={`mock relative w-full ${preview ? 'z-20' : 'z-0'}`} alt="" src={require(`../../../../../public${props.imgSrc}`)} width={100} height={100} />}
                                    <Rnd
                                        className={`frame absolute border-red-700 ${preview ? 'z-10' : 'z-0 border-2'}`} >
                                        <div className={`w-full h-full overlay`}></div>
                                    </Rnd>
                                </div>
                            </div>
                            <div className="flex flex-col bg-white col-span-4 md:col-span-1">
                                <h1 className="p-2 text-lg font-semibold">Mockups</h1>
                                <hr className="border" />
                                <div className="flex flex-col p-4 gap-2">
                                    <label htmlFor="perspective" className="font-semibold">Perspective</label>
                                    <input type="range" step='0.25' value={properties.perspective} min="0" max="1024" onChange={(e) => handlePerspective(e)} id="perspective" />

                                    <h1 className="font-semibold">Rotate</h1>
                                    <label className="text-gray-400" htmlFor="rotateX">RotateX</label>
                                    <input id="rotateX" type="range" value={properties.rotateX} min="-100" max="100" onChange={(e) => handleRotateX(e)} />
                                    <label className="text-gray-400" htmlFor="rotateY">RotateY</label>
                                    <input id="rotateY" type="range" value={properties.rotateY} min="-100" max="100" onChange={(e) => handleRotateY(e)} />

                                    <label className="font-semibold" htmlFor="border_radius">Border Radius</label>
                                    <input id="border_radius" type="range" value={properties.border_radius} min="0" max="100" onChange={(e) => handleBorderRadius(e)} />

                                    <button className="p-2 bg-black text-white rounded-md font-semibold text-center" onClick={() => setPreview(prev => !prev)}>{preview ? "Edit" : "Preview"}</button>
                                    <button className="p-2 bg-black text-white rounded-md font-semibold text-center" onClick={saveMockup}>Save</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            else
                router.push('/admin/mockups')
        else
            return (
                <div>Access denied! Kindly login as Admin</div>
            )
}
