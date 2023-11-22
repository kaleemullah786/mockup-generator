import Header from '../components/Header'
import Provider from '../components/Provider'
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UiHax',
  description: "Welcome to our cutting-edge mockup website! Revolutionize your design presentations with our extensive collection of meticulously crafted mockup templates. From sleek app interfaces to captivating product displays, we offer a diverse range of industry-specific mockups tailored to your creative needs. Elevate your brand's visual identity with our photorealistic mockups that exude professionalism and authenticity. Our intuitive customization tools empower you to effortlessly tweak every element, from colors and fonts to shadows and reflections, ensuring a seamless integration of your designs. With our mockup website, you can captivate clients, impress stakeholders, and stand out from the competition. Experience the power of our immersive mockups and unlock the potential of your creative visions today. Start exploring our collection and embark on a journey of visual excellence!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header/>
          {children}
        </Provider>
      </body>
    </html>
  )
}
