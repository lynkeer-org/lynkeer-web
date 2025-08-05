import { signInRequest } from "@/features/auth/services/signIn";
import { HttpStatusCode } from "axios";
import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    token: string;
  }
}

const auth = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { status, data } = await signInRequest({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (status !== HttpStatusCode.Ok || !data) {
            throw new Error("Invalid credentials");
          }

          const user = {
            id: data.user.id,
            name: data.user.name?.split(" ")[0] || ((credentials.email as string).split("@")[0] as string),
            email: data.user.email,
            token: data.token,
          };

          return user;
        } catch (_error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.accessToken = token.accessToken as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;

      return session;
    },
  },
});

export { auth };
