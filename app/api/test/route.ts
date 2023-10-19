import { NextResponse } from "next/server"

export async function POST(req: Request) {
    console.log("Starting validate")

    const data = await req.json()

    console.log(JSON.stringify(data))

    return NextResponse.json({
        hello: "World"
    })
}

