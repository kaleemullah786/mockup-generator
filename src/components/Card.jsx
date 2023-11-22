import Image from "next/image";
function Card({name,imgSrc}) {
    return (
        <>
            <div className="flex flex-col p-2 items-center bg-white border border-gray-200 rounded-lg shadow">
                <Image className="rounded-t-lg" src={require(`../../public${imgSrc}`)} width={'100%'} height={150} alt="" />
                <h5 className="font-bold tracking-tight text-gray-900">{name}</h5>
            </div>
        </>
    )
}

export default Card