import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "~/app/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const userId = cookies().get('userId')

    if (userId) {
        const user = await prisma.user.findUnique({ where: { id: userId.value }, select: { id: true, username: true, note: true } })

        if (user) {
            return NextResponse.json({ user })
        } else {
            redirect('/logout')
        }
    } else {
        return NextResponse.json({ user: undefined })
    }
}