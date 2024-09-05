import NextAuth, { DefaultSession } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import { ObjectId } from "mongodb"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User{
        id: string,
        name: string,
        email: string,
        username: string,
        profile_pic: string
        image: string,
  }
  interface Session {
      user: {
          id?: string,
          username?: string,
          profile_pic: string
        } & DefaultSession["user"]
    }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string,
    name: string,
    email: string,
    username: string,
    profile_pic: string
    image: string,
  }
}