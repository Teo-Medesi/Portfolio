import './globals.css'
import './globals.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Teo | Full-Stack Web Developer',
  description: "Hello! My name is Teo Medesi and this is my portfolio. I'm an aspiring web developer looking for work.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-base-300"}>{children}</body>
    </html>
  )
}
