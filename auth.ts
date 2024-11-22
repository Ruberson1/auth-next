import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import { findUserByCredentials } from "./lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                console.log(credentials)

                //LÓGICA DE AUTENTICAÇÃO (SE AUTENTICAO RETORNA USER SE NÃO RETORNA NULL)

                const user = findUserByCredentials(credentials.email as string, credentials.password as string);

                return user;
            }
        })
    ],
})