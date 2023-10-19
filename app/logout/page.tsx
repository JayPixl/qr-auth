'use client'

import { useEffect } from 'react'
import { getUrl } from '../utils/handlers'
import axios from 'axios'

export default function Client() {
    useEffect(() => {
        axios.delete('/api/cookie')
            .then(() => {
                getUrl()
                    .then(res => {
                        const url = new URL(res || "")
                        location.href = `${url.protocol}//${url.host}`
                    })
            })
    }, [])
    return <div className='w-full h-[90vh] flex flex-row justify-center items-center'>
        <div className='text-2xl'>Logging out...</div>
        <div className='rounded-full border-transparent border-4 border-b-zinc-900 animate-spin w-12 h-12 ml-5' />
    </div>
}