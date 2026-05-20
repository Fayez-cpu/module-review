import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Resend from "next-auth/providers/resend"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "no-reply@faizstudio.co.uk",
    })],
    session: {
      strategy: "database",
    },
    events: {
      async signIn({ user }) {
        await prisma.auditLog.create({
          data: {
            email: user.email ?? "unknown",
            action: "LOGIN",
            success: true,
          },
        })
      },
    },
    callbacks: {
      async session({ session, user }) {
        session.user.id = user.id
        return session
      }
    },
})