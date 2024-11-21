'use server'

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";


export default async function registerAction(_prevState: any, formData: FormData) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as {
        name: string,
        email: string,
        password: string
    };

    if (!data.email || !data.name || !data.password) {
        return {
            success: false,
            message: 'É necessário enviar todas as informações'
        }
    }

    const user = await db.users.findUnique({
        where: {
            email: data.email
        }
    })

    if (user) {
        return {
            success: false,
            message: 'Este email ja está sendo utilizado'
        }
    }

    await db.users.create({
        data: {
            email: data.email,
            name: data.name,
            password: hashSync(data.password)
        }
    })

    return {
        success: true,
        message: 'Usuário cadastrado com sucesso!'
    }
}