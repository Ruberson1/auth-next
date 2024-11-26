"use server"

import { signIn } from "@/auth";
import { redirect } from "next/navigation";


export default async function LoginAction(_prevState: any, formData: FormData) {

    try {
        await signIn('credentials', formData)

        redirect('/dashboard')

    } catch (error: any) {
        if(error.type === 'CredentialsSignin') {
            return {
                success: false,
                message: error.message
            }
        }
        
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}


  
    
