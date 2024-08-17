import { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/users";
import bcrypt from "bcryptjs"



export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const {email, password} = credentials as{ email: string, password: string};
                try{
                    const user = await User.findOne({email});
                    
                    if(!user){
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password)            

                    if(!passwordMatch){
                        return null;
                    }
                    return user
                }catch(error){
                    console.log("Error", error)
                }
            }})
    ],
    pages: {
        signIn: '/log-in',
        signOut: '/'
    },
    callbacks: {
        async jwt({ token, trigger, session, user }) {
            if (user) {
                token.id = user.id;  // Store user ID in JWT token
                token.username = user.username;  // Store username in JWT token
                token.profile_pic = user.profile_pic;
            }
            if (trigger === "update") {
              // Note, that `session` can be any arbitrary object, remember to validate it!
              token.name = session.name
              token.username = session.username
              token.email = session.email
            }
        
            return token;
        },
        async session({ session, token }) {
            // Add custom properties to the session object
            session.user.id = token.id;  // Include user ID in the session
            session.user.username = token.username;  // Include username in the session
            session.user.profile_pic = token.profile_pic; 
            
            return session;
        },
    },
};