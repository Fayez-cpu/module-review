import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Resend from "next-auth/providers/resend"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "no-reply@faizstudio.co.uk",  // Your verified domain
    })],
})