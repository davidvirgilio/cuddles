import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User{
        id: string,
        name: string,
        email: string,
        username: string,
        profile_pic: string,
  }
  interface Session {
      user: {
          id: any,
          username: any,
          profile_pic: any,
        } & DefaultSession["user"]
    }
}