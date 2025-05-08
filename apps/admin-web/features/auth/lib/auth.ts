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

          const user = { id: data.id, name: data.firstName, email: data.email, token: data.accessToken };

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
        token.accessToken = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.accessToken = token.accessToken as string;

      return session;
    },
  },
});

export { auth };
