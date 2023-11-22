'use client';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const page = () => {
  const router = useRouter()
  const { data: session } = useSession(
    {
      required: true,
      onUnauthenticated() {
        router.replace('/admin/signin')
      }
    }
  )


  if (session)
    if (localStorage.getItem('type') === 'admin')
      router.replace('/admin/mockups')
    else
      return (
        <div>Access denied! Kindly login as Admin</div>
      )
}

export default page