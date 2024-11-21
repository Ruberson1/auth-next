'use client'

import Form from "next/form"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useActionState } from "react";
import registerAction from "./registerAction";

export default function registerForm() {
    const [state, formAction, isPending] = useActionState(registerAction, null);
    return (
        <>
            {(
                state?.success === false && (
                    <div className="bg-red-100 mb-6 border text-xs flex flex-col border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Erro!</strong>
                        <span className="block sm:inline">{state?.message}</span>
                    </div>
                )
            )}
            <Form action={formAction}>
                <div>
                    <Label>Nome</Label>
                    <Input type="text" name="name" placeholder="Fulano de Tal" />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="eu@exemplo.com" />
                </div>
                <div>
                    <Label>Senha</Label>
                    <Input type="password" name="password" placeholder="********" />
                </div>
                <div>
                    <Button className="w-full mt-6" type="submit">
                        Registrar
                    </Button>
                </div>
            </Form>
        </>
    )
}