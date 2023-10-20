'use client'

import { useState, useEffect } from "react"
import axios from 'axios'
import { clientRedirect, getUrl } from "../utils/handlers"
import { useRouter, useSearchParams } from "next/navigation"

interface props {

}

export default function Form({ }: props) {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const params = useSearchParams()

    const router = useRouter()

    const [page, setPage] = useState<'login' | 'signup'>('login')

    const [sent, setSent] = useState(true)

    const [error, setError] = useState("Error")

    useEffect(() => {
        setInputs({
            username: "",
            password: ""
        })
    }, [page])

    useEffect(() => {
        if (params.get("u") || params.get("key")) {
            if (typeof (params.get("u")) === 'string' && typeof (params.get("key")) === 'string') {
                axios.post('/api/login', {
                    username: params.get("u"),
                    password: params.get("key"),
                    type: 'qrlogin'
                }).then(res => {
                    if (res.data?.success) {
                        getUrl()
                            .then(res => {
                                const url = new URL(res || "")
                                location.href = `${url.protocol}//${url.host}`
                            })
                    } else {
                        router.push('/login')
                    }
                })
            } else {
                router.push('/login')
            }
        } else {
            setSent(false)
        }
    }, [])

    const submitForm = (e: any) => {
        e.preventDefault()

        if (sent) return

        setSent(i => true)

        axios.post('/api/login', {
            username: inputs.username,
            password: inputs.password,
            type: page
        }).then(res => {
            if (res.data?.success) {
                getUrl()
                    .then(res => {
                        const url = new URL(res || "")
                        location.href = `${url.protocol}//${url.host}`
                    })
            } else {
                setSent(i => false)
                setError(res.data?.error)
            }
        })

    }

    return <div className="w-full h-[90vh] flex items-center justify-center">
        <form onSubmit={e => submitForm(e)} aria-disabled={sent} className="p-8 md:p-16 flex flex-col items-center rounded-2xl shadow-xl bg-zinc-900 m-8 w-full md:w-2/3 max-w-[40rem]">
            <div className="flex flex-row items-center">
                <div
                    className={`py-1 px-4 md:py-2 md:px-8 rounded-full cursor-pointer font-bold hover:scale-105 md:mx-2 border-2 border-transparent transition ${page === 'login' ? 'bg-rose-500 text-zinc-900' : 'text-rose-500 hover:border-rose-500'}`}
                    onClick={() => setPage('login')}
                >
                    Log In
                </div>
                <div
                    className={`py-1 px-4 md:py-2 md:px-8 rounded-full cursor-pointer font-bold hover:scale-105 md:mx-2 border-2 border-transparent transition ${page === 'signup' ? 'bg-rose-500 text-zinc-900' : 'text-rose-500 hover:border-rose-500'}`}
                    onClick={() => setPage('signup')}
                >
                    Sign Up
                </div>
            </div>

            {error && <div className="w-full rounded-xl mt-5 md:mt-8 flex flex-row items-center border-rose-500 border-2 text-rose-500 p-2 md:p-3">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>{error}</div>
            </div>}

            <label htmlFor="username" className="pb-3 pt-5 md:pt-8 text-xl md:text-2xl">
                Username
            </label>
            <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={e => setInputs({ ...inputs, username: e.target.value })}
                className="rounded-xl bg-zinc-300 transition text-zinc-800 p-2 md:p-3 text-lg md:text-xl w-full text-center outline-none focus:bg-zinc-200"
                required
                minLength={3}
                maxLength={15}
            />

            <label htmlFor="password" className="pb-3 pt-5 md:pt-8 text-xl md:text-2xl">
                Password
            </label>
            <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={e => setInputs({ ...inputs, password: e.target.value })}
                className="rounded-xl bg-zinc-300 transition text-zinc-800 p-2 md:p-3 text-lg md:text-xl w-full text-center outline-none focus:bg-zinc-200"
                required
                minLength={4}
                maxLength={25}
            />

            <button type="submit" className={`text-xl md:text-2xl py-2 px-8 rounded-md self-center flex flex-row justify-center items-center font-semibold transition mt-8 md:mt-12 ${!sent ? "bg-rose-500" : "bg-zinc-500"} text-zinc-900 hover:scale-105 transition`}>
                {page === "login" ? "Log In" : "Sign Up"} {sent && <div className="rounded-full border-transparent border-4 border-b-zinc-900 animate-spin w-6 h-6 ml-3" />}
            </button>
        </form>
    </div>
}