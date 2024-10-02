"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"
import Link from "next/link"
import { useForm } from 'react-hook-form'

interface FormValues {
  email: string;
  password: string;
}

export function AuthForm() {  
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()


    const onSubmit = (data: FormValues) => {
      // Manipulação dos dados submetidos
      console.log('Form submitted with:', data)
      console.log('Email:', data.email)
      console.log('Password', data.password)
    }

    const handleGmailLogin = () => {
      console.log('Gmail login attempted')
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
                              {...register("email", { required: "Email é obrigatório" })}
                              type="email"
                              autoComplete="email"
                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                              placeholder="Email"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                          <Label htmlFor="password" className="sr-only">Senha</Label>
                          <Input
                              id="password"
                              {...register("password", { required: "Senha é obrigatória" })}
                              type="password"
                              autoComplete="current-password"
                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                              placeholder="Senha"
                          />
                          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                      </div>
                  </div>

                  <div className="flex items-center justify-between">
                      <Button
                          type="submit"
                          className="group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                          Entrar
                      </Button>
                      <Link href="/auth/register" passHref>
                          <Button
                              className="ml-4 flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                              Cadastre-se
                          </Button>
                      </Link>
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