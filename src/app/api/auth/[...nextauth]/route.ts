import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../../../lib/utils/dbConnection'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '../../../../../lib/utils/db'
import User from '../../../../../lib/mongo/models/users'
import type { NextAuthOptions } from 'next-auth'
import { DefaultAdapter } from 'next-auth/adapters'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'

export const authOptions:NextAuthOptions & { adapter?: DefaultAdapter } = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // Passwordless / email sign in
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
    CredentialsProvider({
      id: 'user',
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith@example.com" },
      },
      async authorize(credentials) {
        await db.connect()
        const user = await User.findOne({ email: credentials.email })
        const { _doc: doc } = user
        if (Object.keys(doc).includes('password')) {
          return null
        } else {
          return user

        }
      }
    }),
    CredentialsProvider({
      id: 'admin',
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        await db.connect()
        const user = await User.findOne({ email: credentials.email, password: credentials.password })
        if (user) {
          return user
        } else {
          return null

        }
      }
    })
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "", // Absolute URL to image
    buttonText: "" // Hex color code
  },
  pages: {
    signIn:'/user/signin'
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }