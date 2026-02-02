// pages/api/auth/[...nextauth].ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

import { LoginOld } from "@/lib/auth/authentication";

const BaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5800";

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
        avatar?: string;
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
        avatar?: string;
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
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
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

                    return response;
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
                token.firstname = user.firstname;
                token.lastname = user.lastname;
                token.fullname = user.fullname;
                token.phonenumber = user.phonenumber;
                token.email = user.email;
                token.avatar = user.avatar ?? "";
                token.token = user.token;
            }

            if (trigger === "update" && session) {
                token.id = session.id;
                token.username = session.username;
                token.firstname = session.firstname;
                token.lastname = session.lastname;
                token.fullname = session.fullname;
                token.phonenumber = session.phonenumber;
                token.email = session.email;
                token.avatar = session?.avatar || "";
                token.token = session.token;
            }

            return token;
        },

        async session({ session, token }) {
            // Struktur session sesuai yang Anda inginkan
            return {
                ...session,
                id: token.id,
                user: {
                    name: token.fullname || token.username,
                    email: token.email,
                    image: token.avatar,
                    id: token.id,
                    username: token.username,
                    firstname: token.firstname,
                    lastname: token.lastname,
                    fullname: token.fullname,
                    phonenumber: token.phonenumber,
                    avatar: token.avatar ?? "",
                    token: token.token,
                },
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
