# QR Auth App

> [**>> Live Demo <<**](https://qr-auth.jpxl.dev)
>
> *Created with Next 13, TailwindCSS, Prisma, and MongoDB*

## How To Use

You can [create an account](https://qr-auth.jpxl.dev) or scan the QR code on the homepage to log in as a test user. Once logged in, you'll be able to scan the QR code to log in on other devices!

> Note: The QR code will change with each login, so the same QR code cannot be used twice.

## How It Works

A login key is stored in the database along with each user. When a login QR code is requested, the encrypted user's password is hashed with my encryption library [`pixel-crypt`](https://github.com/JayPixl/pixel-crypt) using the user's login key as a seed. When the QR code is scanned, this hash is sent to the server and verified before authenticating the login.