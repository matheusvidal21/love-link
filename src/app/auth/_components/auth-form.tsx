"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

interface FormValues {
    email: string;
}

export function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true)

            await signIn('email', {
                email: data.email,
                redirect: false,
                callbackUrl: '/app',
            })

            toast({
                'title': 'Link de confirmação enviado',
                'description': 'Verifique sua caixa de entrada para confirmar seu email',
            })
        } catch {
            toast({
                'title': 'Error',
                'description': 'Erro ao enviar link de confirmação. Tente novamente',
            })
        } finally {
            setLoading(false)
        }
    }

    const handleGmailLogin = () => {
        signIn('google', { callbackUrl: '/app' });
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Heart className="mx-auto h-12 w-12 text-red-500" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Bem-vindo ao LoveLink</h2>
                    <p className="mt-2 text-sm text-gray-600">Entre e comece a eternizar sua história de amor</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <Label htmlFor="email" className="sr-only">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                {...register("email", { required: "Email é obrigatório" })}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                            ) : (
                                "Enviar link de confirmação"
                            )}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Button
                            onClick={handleGmailLogin}
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                            </svg>
                            Entrar com Gmail
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
