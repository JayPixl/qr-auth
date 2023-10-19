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
        <a href='https://github.com/JayPixl/qr-auth' className="fixed bottom-2 left-2 z-50">
          <div
            className="rounded-full py-2 px-4 font-bold bg-zinc-900 text-zinc-200 flex flex-row items-center opacity-50 hover:opacity-90 transition"
          >
            <div className="font-mono mr-2">View Page Source</div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
        </a>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
