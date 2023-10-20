import { User } from "@prisma/client";
import Link from "next/link";

interface props {
    user?: User
    qrurl?: string
    sampleqr?: string
}

export default function Homepage({ user, qrurl, sampleqr }: props) {
    return <div className='p-8 flex flex-col lg:flex-row w-full h-[90vh] items-center justify-evenly'>
        {user ? <>
            <div className='w-full flex justify-center'>
                <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white p-1 rounded-xl border-4 border-rose-500 drop-shadow-[0px_0px_32px_rgba(244_62_94_/_0.8)] hover:drop-shadow-[0px_0px_48px_rgba(244_62_94_/_0.9)] transition">
                    {qrurl && <img src={qrurl} alt="QR Code" className="w-full h-full" />}
                </div>
            </div>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className="text-xl md:text-2xl flex flex-row items-center">
                    Logged in as <span className="text-rose-500 font-semibold text-2xl md:text-3xl ml-3">{user?.username}</span>
                </div>
                <div className="text-lg font-light mt-5 md:mt-8 italic text-center">
                    Scan the QR Code to log in on another device!
                </div>
            </div>
        </> : <>
            <div className='w-full flex justify-center'>
                <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white p-1 rounded-xl border-4 border-rose-500 drop-shadow-[0px_0px_32px_rgba(244_62_94_/_0.8)] hover:drop-shadow-[0px_0px_48px_rgba(244_62_94_/_0.9)] transition">
                    {sampleqr && <img src={sampleqr} alt="QR Code" className="w-full h-full" />}
                </div>
            </div>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className="text-xl md:text-2xl flex flex-col items-center justify-center">
                    <Link href='/login' className="text-rose-500 font-semibold text-2xl md:text-3xl hover:scale-105 transition">Log in here</Link>
                    <div className="font-light text-lg my-3 md:my-5">- or -</div>
                    <div className="text-center">Scan this QR code to log in as a test user.</div>
                </div>
            </div>
        </>}
    </div>
}