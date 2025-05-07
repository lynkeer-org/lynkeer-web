import type { AuthType } from "@/features/auth/types/auth";
import NextAuth from "next-auth";
import type { DefaultSession, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    token: string;
  }
}

const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          // TODO: Call the login service to check is a valid user.
          const user = { id: "1234", firstName: "Andres", email: credentials?.email, token: "AFVB_TOKEN_1" };

          if (user) {
            return user;
          }

          throw new Error("Invalid credentials");
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "An unknown error occurred: SignIn");
        }
      },
    }),
  ],
  session: {
    // maxAge: 200,
    // updateAge: 0,
  },
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

const typedAuth: AuthType = auth;
export { handlers, signIn, signOut, typedAuth as auth };
