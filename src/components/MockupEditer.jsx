'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { Rnd } from "react-rnd";
const MockupEditer = () => {
    const [preview, setPreview] = useState(false)
    const [properties, setProperties] = useState({
        perspective: '0',
        rotateX: '0',
        rotateY: '0',
        border_radius: '0'
    })
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
        const img = document.getElementsByClassName('mock')[0]
        const box = document.getElementsByClassName('box')[0]
        const frame = document.getElementsByClassName('frame')[0]
        const overlay = document.getElementsByClassName('overlay')[0]
        img.src=searchParams.get('imgSrc')
        // box.width = img.naturalWidth/2
        // box.height = img.naturalHeight/2
        if (properties.perspective !== '0')
            frame.style.perspective = properties.perspective + 'px'
        overlay.style.transform = `rotateX(${properties.rotateX}deg) rotateY(${properties.rotateY}deg)`
        overlay.style.borderRadius = `${properties.border_radius}%`
    }, [properties])
    const saveMockup = (e) => {
        e.preventDefault()
        const frame=document.getElementsByClassName('frame')[0].getBoundingClientRect()
        const data={
            name:searchParams.get('name'),
            category:searchParams.get('category'),
            imgSrc:searchParams.get('imgSrc'),
            frame:{
                top:frame.top,
                left:frame.left,
                width:frame.width,
                height:frame.height
            },
            overlay:{
                perspective:properties.perspective,
                borderRadius:properties.border_radius,
                rotateX:properties.rotateX,
                rotateY:properties.rotateY
            }
        }
        const form=new FormData()
        form.append('data',data)
        fetch('/api/saveMockup',{
            method:"POST",
            body:data
        })
        .then(res=>res.json())
        .then(res=>console.log(res))
    }

    return (
        <>
            <div className="min-h-[90vh] bg-gray-100  grid grid-cols-4">
                <div className="col-span-4 md:col-span-3 flex justify-center items-center">
                    <div className="box relative" >
                        <Image className={`mock relative w-full ${preview ? 'z-20' : 'z-0'}`} alt="" src=''/>
                        <Rnd default={{
                            x: 50,
                            y: 50,
                            width: 100,
                            height: 100,
                        }} className={`frame border-red-700 ${preview ? 'z-10' : 'z-0 border-2'}`} >
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
}

export default MockupEditer