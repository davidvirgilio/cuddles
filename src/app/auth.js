import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
export const { handlers, auth } = NextAuth({providers: [ Credentials ]})