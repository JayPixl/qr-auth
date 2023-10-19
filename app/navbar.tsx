'use client'

import { useState, useEffect } from 'react'
import { User } from "@prisma/client"
import Link from "next/link"

interface props {

}

export default function Navbar({ }: props) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUser(data.user || undefined))
    }, [])

    return <>
        <div className='w-full shadow-xl fixed top-0 bg-zinc-900 flex justify-between items-center p-5 h-[10vh]' id='navbar'>
            <Link href='/' className='font-mono text-2xl flex items-center flex-row'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                </svg>
                <div>QR Auth</div>
            </Link>
            <div className='flex flex-row items-center'>
                {user ? <Link href='/logout' className='text-xl text-rose-500 font-semibold p-2 hover:scale-105 transition'>
                    Log Out
                </Link> : <Link href='/login' className='text-xl text-rose-500 font-semibold p-2 hover:scale-105 transition'>
                    Log In
                </Link>}
            </div>
        </div>
        <div className='w-full h-[10vh]' />
    </>
}