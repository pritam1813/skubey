import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/db";
import { type User } from "@prisma/client";


async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}



export const {handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);
        // logic to salt and hash password
        //const pwHash = saltAndHashPassword(parsedCredentials.data?.password);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
           user = await getUser(email);
          if (!user) return null;

          // const passwordMatch = await argon2.verify(user.password, password);
          // if (passwordMatch) {
          //   console.log(user);
          //   return user;
          // }
          return user;
        }

        console.log("Invalid Credentials");
        return null;
      },
    }),
  ],
});
