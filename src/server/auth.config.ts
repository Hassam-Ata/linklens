import { DefaultSession, NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import z from "zod";
import { JWT } from "next-auth/jwt";
import { db, eq } from "./db";
import { users } from "./db/schema";
import bcrypt from "bcryptjs";

//extends the types to include role
declare module "next-auth" {
  interface User {
    role?: "user" | "admin";
  }
  interface Sessions {
    user: {
      id: string;
      role?: "user" | "admin";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "admin";
  }
}

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
    verifyRequest: "/verify-request",
    newUser: "/register",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      // Admin routes: must be logged in AND be admin
      if (isOnAdmin) {
        return isLoggedIn && auth?.user?.role === "admin";
      }
      // Dashboard routes: must be logged in
      if (isOnDashboard) {
        return isLoggedIn;
      }

      // All other routes: public
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        (token.id = user.id),
          (token.email = user.email),
          (token.name = user.name),
          (token.picture = user.image),
          (token.role = user.role);
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        (session.user.id = token.id as string),
          (session.user.role = token.role);
      }
      return session;
    },
  },

  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email.toLowerCase()));

        if (!user) return null;

        //check if password is correct

        const passwordMatch = await bcrypt.compare(
          password,
          user.password || ""
        );
        if (!passwordMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
};
