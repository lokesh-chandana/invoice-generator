import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      try {
        // 1. Check if user exists in your Hostinger DB
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        })

        // 2. If not, create them
        if (!existingUser) {
          console.log("Creating new user:", user.email);
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              invoiceCount: 0, // Give them 0 invoices to start
            },
          })
        }
        return true;
      } catch (error) {
        console.error("Error saving user to DB:", error);
        return false;
      }
    },
  },
})