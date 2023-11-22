'use client';
import { useState, useEffect,useRef,useContext } from "react";
import Image from "next/image";
import { toPng } from 'html-to-image';
import { useRouter } from "next/navigation";
import uploadIcon from '../../../../public/assets/icons/UUpload.svg'
import { useSession } from "next-auth/react";
import { PropsContext } from "../../../context/PropsContext";

export default function Home() {
    const router=useRouter()
    const elementRef=useRef()
    const {props}=useContext(PropsContext)
    const [preview, setPreview] = useState(true)
    const [img,setImg]=useState(null)
    const { data: session } = useSession(
        {
          required: true,
          onUnauthenticated() {
            router.replace('/admin/signin')
          }
        }
      )
    const htmlToImageConvert = () => {
        toPng(elementRef.current, { cacheBust: false })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "my-image-name.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleChange = (e) => {
        e.preventDefault()
        const [file] = e.target.files
        if (file) {
            setImg(URL.createObjectURL(file))
            setPreview(false)
        }
    }
if(session)
    if(props){
    useEffect(() => {
        const frame = document.getElementsByClassName('frame')[0]
        const overlay = document.getElementsByClassName('overlay')[0]
        frame.style.width = props.frame.width + 'px'
        frame.style.height = props.frame.height + 'px'
        frame.style.top = props.frame.top + 'px'
        frame.style.left = props.frame.left + 'px'
        if (props?.overlay?.perspective !== '0')
            frame.style.perspective = props?.overlay?.perspective + 'px'
        overlay.style.transform = `rotateX(${props?.overlay?.rotateX}deg) rotateY(${props?.overlay?.rotateY}deg)`
        overlay.style.borderRadius = `${props?.overlay?.borderRadius}%`
    })

    return (
        <>
            <div className="min-h-[90vh] grid grid-cols-4">
                <div className="col-span-4 md:col-span-3 flex justify-center items-center">
                    <div ref={elementRef} className="box relative" >
                        {props&&<Image className={`mock relative w-full z-20`} alt="" src={require(`../../../../public${props.imgSrc}`)} width={100} height={100} />}
                        <div
                            className={`frame absolute z-10`} >
                            <div className={`w-full h-full overlay`} style={{backgroundImage:img?`url(${img})`:''}}></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col col-span-4 md:col-span-1">
                    <div className="m-auto">
                    <h1 className="text-lg lg:text-xl py-4 font-bold">{props.name}</h1>
                    <div className="gap-4 w-96 md:w-auto  flex rounded-md shadow-md p-8 flex-col">
                        <h1 className="font-semibold text-md">Upload image</h1>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="image" className="flex justify-center items-center cursor-pointer p-2 h-32 border-dotted bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2">
                                <input type="file" accept=".png, .jpeg, .jpg .svg" id="image" hidden onChange={handleChange} />
                                <span className="flex gap-2 items-center"><Image src={uploadIcon} />Upload image</span>
                            </label>
                            <button className={`p-2 rounded-md font-semibold text-center ${preview?'bg-gray-300 text-gray-500':'text-white bg-black'}`} disabled={preview} onClick={htmlToImageConvert}>Download</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )}
    else
    router.push('/user')
else
router.replace('/user/signin')
}
