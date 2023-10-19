import './globals.css'
import type { Metadata } from 'next'
import { Inter, Fira_Mono } from 'next/font/google'
import Navbar from './navbar'
import { cookies } from 'next/headers'
import { prisma } from './utils/prisma'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'

const inter = Inter({
  subsets: ['latin'],
  variable: "--font-main"
})

const firaMono = Fira_Mono({
  weight: ["400", "500", "700"],
  subsets: ['latin'],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: 'QR Code Authentication',
  description: 'User Auth Project created by Joshua Lawrence, Jr'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='max-w-screen overflow-x-hidden overscroll-none'>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
