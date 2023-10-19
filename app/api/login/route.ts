import { prisma } from "~/app/utils/prisma"
import bcrypt from 'bcrypt'
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import cuid from 'cuid'
import { unpixelate } from 'pixel-crypt'

export async function POST(req: Request) {

    const { username, password, type } = await req.json()

    if (type === "signup") {

        if (!username?.length || username?.length < 3 || username?.length > 15 || /[^a-zA-Z0-9]+/g.test(username)) {
            return NextResponse.json({
                error: "Username must be between 3 and 15 characters long and cannot contain special characters."
            })
        }

        if (!password?.length || password?.length < 4 || password?.length > 25) {
            return NextResponse.json({
                error: "Password must be between 4 and 25 characters long."
            })
        }

    }

    switch (type) {
        case 'login': {
            const match = await prisma.user.findFirst({
                where: {
                    username: {
                        equals: username,
                        mode: 'insensitive'
                    }
                }
            })

            if (!match) return NextResponse.json({
                error: "Username or password is incorrect."
            })

            if (await bcrypt.compare(password, match.password)) {
                cookies().set({
                    name: "userId",
                    value: match.id,
                    httpOnly: process.env.NODE_ENV === "production",
                    maxAge: 172800000,
                    sameSite: true,
                    secure: process.env.NODE_ENV === "production",
                })

                revalidatePath("/")

                return NextResponse.json({
                    success: true
                })
            } else {
                return NextResponse.json({
                    error: "Username or password is incorrect."
                })
            }
            break
        }
        case 'signup': {
            const match = await prisma.user.findFirst({
                where: {
                    username: {
                        equals: username,
                        mode: 'insensitive'
                    }
                }
            })

            if (match) return NextResponse.json({
                error: "Username already exists"
            })

            const user = await prisma.user.create({
                data: {
                    username,
                    password: await bcrypt.hash(password, 10),
                    loginKey: cuid(),
                    note: ""
                }
            })

            if (user?.id) {
                cookies().set({
                    name: "userId",
                    value: user.id,
                    httpOnly: process.env.NODE_ENV === "production",
                    maxAge: 172800000,
                    sameSite: true,
                    secure: process.env.NODE_ENV === "production",
                })

                revalidatePath("/")

                return NextResponse.json({
                    success: true
                })
            } else return NextResponse.json({
                error: "Could not create new user."
            })
            break
        }
        case 'qrlogin': {
            const match = await prisma.user.findFirst({
                where: {
                    username: {
                        equals: username,
                        mode: 'insensitive'
                    }
                }
            })

            if (!match) return NextResponse.json({
                error: "Username or password is incorrect."
            })

            if (unpixelate(password, match.loginKey || "default").result === match.password.substring(0, 25)) {
                cookies().set({
                    name: "userId",
                    value: match.id,
                    httpOnly: process.env.NODE_ENV === "production",
                    maxAge: 172800000,
                    sameSite: true,
                    secure: process.env.NODE_ENV === "production",
                })

                revalidatePath("/")

                await prisma.user.update({
                    where: {
                        id: match.id
                    },
                    data: {
                        loginKey: cuid()
                    }
                })

                return NextResponse.json({
                    success: true
                })
            } else {
                return NextResponse.json({
                    error: "Username or password is incorrect."
                })
            }
            break
        }
        default: {
            return NextResponse.json({ error: "Invalid Request" })
        }
    }
}

