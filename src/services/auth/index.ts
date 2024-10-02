import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth";
import nodemailer from "nodemailer";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
      signIn: '/auth',
      signOut: '/auth',
      error: '/auth',
      verifyRequest: '/auth',
      newUser: '/app',
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
        sendVerificationRequest({ identifier, url, provider }) {
          const transport = nodemailer.createTransport(provider.server);
  
          transport.sendMail({
            to: identifier,
            from: provider.from,
            subject: `LoveLink - Link de confirmação`,
            html: `
              <div style="text-align: center; padding: 20px; font-family: Arial, Helvetica, sans-serif;">
              <h1 style="color: #e63946; font-size: 24px; margin-bottom: 20px;">Seja bem-vindo ao LoveLink!</h1>
              <p style="font-size: 16px; color: #333; margin-bottom: 30px;">Para acessar sua conta, clique no botão abaixo:</p>
              
              <a href="${url}" style="background-color: #e63946; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; margin-bottom: 20px; display: inline-block;">Entrar no LoveLink</a>
              
              <p style="font-size: 14px; color: #555; margin: 30px 0;">Ou copie e cole este link no seu navegador:</p>
              <a href="${url}" style="color: #e63946; font-size: 14px; word-wrap: break-word;">${url}</a>
              
              <p style="font-size: 12px; color: #777; margin-top: 40px;">Se você não solicitou este e-mail, pode ignorá-lo com segurança.</p>
              </div>
            `,
          });
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

export const auth = () => getServerSession(authOptions);