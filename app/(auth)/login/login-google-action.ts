"use server";

import { signIn } from "@/auth";

export default async function LoginGoogleAction() {
    try {
        await signIn("google"); // Importante usar "google" como identificador
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Algo deu errado",
        };
    }
}
