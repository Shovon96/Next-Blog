import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";


declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name: string | null
            email: string | null
            image: string | null
        }
    }
    interface User {
        id: string
        name: string | null
        email: string | null
        image: string | null
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        })
                    });
                    if (!res.ok) {
                        return null
                    }
                    const user = await res.json();
                    if (user.id) {
                        return {
                            id: user?.id,
                            name: user?.name,
                            email: user?.email,
                            image: user?.picture
                        }
                    } else {
                        return null
                    }
                } catch (error) {
                    console.error("Error logging in:", error);
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token?.id as string
            }
            return session;
        }
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}
