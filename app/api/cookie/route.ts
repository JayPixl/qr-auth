import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function DELETE(req: Request) {
    const res = new NextResponse
    res.cookies.delete('userId')
    return res
}