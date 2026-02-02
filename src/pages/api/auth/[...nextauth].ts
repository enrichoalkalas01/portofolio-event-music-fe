// pages/api/auth/[...nextauth].ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

import { LoginOld } from "@/lib/auth/authentication";

const BaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Interface untuk token
interface IToken {
    access_token: string;
    refresh_token: string;
    session_token: string | number;
    sso_refresh_token: string | number;
    expired_rf: number;
    expired: number;
    type: string;
}

// Extend types untuk NextAuth
declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        image: string | null;
        username: string;
        firstname: string;
        lastname: string;
        fullname: string;
        phonenumber: string;
        token: IToken;
    }

    interface Session {
        user: {
            name: string;
            email: string;
            image: string | null;
        };
        id: string;
        token: IToken;
        accessToken: string;
        isValid: boolean;
        error: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username: string;
        firstname: string;
        lastname: string;
        fullname: string;
        phonenumber: string;
        email: string;
        token: IToken;
        accessToken: string;
        isValid: boolean;
        error: string | null;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                try {
                    const response = await LoginOld({
                        username: credentials.username,
                        password: credentials.password,
                    });

                    return null;
                } catch (error: any) {
                    console.error(
                        "Login error:",
                        error.response?.data || error.message,
                    );
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // Saat login pertama kali, simpan semua data user ke token. User hanya akan bekerja jika pertama kali login, jika sudah login akan ke token props
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }

            if (token) {
                console.log(token);
            }

            return token;
        },

        async session({ session, token }) {
            // Struktur session sesuai yang Anda inginkan
            return {
                ...session,
                user: {
                    name: token.fullname || token.username,
                    email: token.email,
                    image: null,
                },
                id: token.id,
                token: token.token,
                accessToken: token.accessToken,
                isValid: token.isValid,
                error: token.error,
            };
        },
    },

    pages: {
        signIn: "/login",
        error: "/login",
    },

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
