'use client'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
export default function Home() {
  const router=useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/user/signin')
    }
  })
 
    if (session) {
    const route=localStorage.getItem('type')
    router.replace('/'+route)
    }
  
}
