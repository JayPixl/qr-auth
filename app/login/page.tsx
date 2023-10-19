import { redirect } from 'next/navigation'
import { prisma } from '../utils/prisma'
import bcrypt from 'bcrypt'
import Form from './form'
import cuid from 'cuid'
import { cookies, headers } from 'next/headers'
import axios from 'axios'
import { clientRedirect, getUrl } from '../utils/handlers'

export default function Login() {
    return <div className="h-full w-full bg-zinc-800 text-zinc-200">
        <Form />
    </div>
}