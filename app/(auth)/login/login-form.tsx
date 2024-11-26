"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário

        setError(null);
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false, // Evita redirecionamento automático
            });

            if (result?.error) {
                setError("Credenciais inválidas. Verifique seus dados.");
            } else {
                router.push("/dashboard"); // Redireciona manualmente após o login
            }
        } catch (err) {
            setError("Ocorreu um erro ao fazer login. Tente novamente.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signIn("google");
        } catch (err) {
            console.error("Erro ao fazer login com o Google", err);
        }
    };

    return (
        <div>
            {/* Mensagem de erro */}
            {error && (
                <div
                    className="bg-red-100 mb-6 border text-xs flex flex-col border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong className="font-bold">Erro!</strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* Formulário de login com credenciais */}
            <form onSubmit={handleLogin}>
                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="eu@exemplo.com"
                        required
                    />
                </div>
                <div>
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                    />
                </div>
                <div>
                    <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                        {isLoading ? "Entrando..." : "Login"}
                    </Button>
                </div>
            </form>

            {/* Separador */}
            <div className="mt-4 text-center">
                <span>Ou</span>
            </div>

            {/* Botão de login com Google */}
            <div>
                <Button className="w-full mt-6" onClick={handleGoogleLogin}>
                    Entrar com o Google
                </Button>
            </div>
        </div>
    );
}
