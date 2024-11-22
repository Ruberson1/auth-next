import { compareSync } from "bcrypt-ts";
import db from "./db";

type User = {
    name: string | null,
    email: string,
    password?: string
}

export async function findUserByCredentials(email: string, password: string): Promise<User | null> {
    const user = await db.users.findFirst({
        where: {
            email: email
        }
    })

    if (!user) {
        return null;
    }

    const passMatch = compareSync(password, user.password);

    if (passMatch) {
        return { email: user.email, name: user.name }
    }

    return null;
}