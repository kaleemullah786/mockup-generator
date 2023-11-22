'use client'
import { PropsContextProvider } from '../context/PropsContext'
import { SearchContextProvider } from '../context/SearchContext'
import { SessionProvider } from 'next-auth/react'

const Provider = ({ children }) => {
  return (
    <PropsContextProvider>
      <SearchContextProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </SearchContextProvider>
    </PropsContextProvider>
  )
}

export default Provider