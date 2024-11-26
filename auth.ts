import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

import { findUserByCredentials } from "./lib/user";
import { redirect } from "next/dist/server/api-utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {

                const user = findUserByCredentials(credentials.email as string, credentials.password as string);

                return user;
            }
        })
    ],
})