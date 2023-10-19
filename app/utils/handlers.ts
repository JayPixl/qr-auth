'use server'

import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const clientRedirect = async (url: string) => {
    'use server'
    redirect(url)
}

export const getUrl = async () => {
    'use server'
    return headers().get('x-url')
}