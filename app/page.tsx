import { cookies, headers } from 'next/headers'
import { prisma } from './utils/prisma'
import { pixelate } from 'pixel-crypt'
import Link from 'next/link'
import Homepage from './homepage'
import { User } from '@prisma/client'

const authenticate = async () => {
  'use server'

  const id = cookies().get('userId')?.value

  if (!id) {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: 'test',
          mode: 'insensitive'
        }
      }
    })

    if (!user) return {
      user: undefined
    }

    const params = new URLSearchParams({
      size: '150x150',
      // data: `http${process.env.NODE_ENV === "production" ? 's' : ''}://${headers().get('host')}/login?u=${encodeURIComponent(user?.username)}&pw=${encodeURIComponent(user.password)}&key=${user.loginKey}`
      data: `http${process.env.NODE_ENV === "production" ? 's' : ''}://${headers().get('host')}/login?u=${encodeURIComponent(user?.username)}&key=${pixelate(user.password.substring(0, 25), user.loginKey || "default").pixel}`
    })

    const sampleqr = `https://api.qrserver.com/v1/create-qr-code/?${params}`

    return {
      user: undefined,
      sampleqr
    }
  } else {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        username: true,
        password: true,
        note: true,
        loginKey: true
      }
    }) || undefined

    if (!user) return {
      user: undefined
    }

    const params = new URLSearchParams({
      size: '150x150',
      data: `http${process.env.NODE_ENV === "production" ? 's' : ''}://${headers().get('host')}/login?u=${encodeURIComponent(user?.username)}&key=${pixelate(user.password.substring(0, 25), user.loginKey || "default").pixel}`
    })

    const qrurl = `https://api.qrserver.com/v1/create-qr-code/?${params}`

    return {
      user: {
        ...user,
        loginKey: "hidden",
        password: "hidden"
      } as User,
      qrurl
    }
  }
}

export default async function Home() {
  const { user, qrurl, sampleqr } = await authenticate()
  return <Homepage user={user} qrurl={qrurl} sampleqr={sampleqr} />
}
