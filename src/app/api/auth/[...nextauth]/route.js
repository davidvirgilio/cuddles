import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/users";
import bcrypt from "bcryptjs"


export const authOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const {email, password} = credentials;
                try{
                    const user = await User.findOne({email});
                    
                    if(!user){
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    console.log(passwordMatch)
            

                    if(!passwordMatch){
                        return null;
                    }

                    return user;
                }catch(error){
                    console.log("Error", error)
                }
            }})
    ],
    pages: {
        signIn: '/log-in',
    }
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST} 

