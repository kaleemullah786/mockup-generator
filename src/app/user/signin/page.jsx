'use client';
import Signin from '../../../components/Signin'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const page = () => {

    const router=useRouter()
    const { data: session } = useSession()
    if(!session)
    return (
        <>
            <Signin />
        </>
    )
    router.replace('/user')
}

export default page