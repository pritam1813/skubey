import "server-only";

import { cookies } from "next/headers";
import { decryptSession } from "./sessioncrypto";
import { cache } from "react";
import prisma from "@/prisma/db";
import { Session, User } from "@prisma/client";

interface VerifiedSession {
  isAuth: boolean;
  sessionId: string;
}

// Type for the user with profile but without password
type SafeUser = Omit<User, "password"> & {
  profile: { role: string };
};

// Type for the session with safe user
interface SessionWithUser extends Session {
  user: SafeUser;
}

export const verifySession = cache(
  async (): Promise<VerifiedSession | null> => {
    try {
      const cookie = (await cookies()).get("session")?.value;

      if (!cookie) {
        return null;
      }

      const session = await decryptSession(cookie);

      if (!session?.sessionId) {
        return null;
      }

      return { isAuth: true, sessionId: session.sessionId };
    } catch (error) {
      console.error("Session verification failed:", error);
      return null;
    }
  }
);

export const getSessionUser = cache(
  async (): Promise<SessionWithUser | null> => {
    const session = await verifySession();
    if (!session) return null;

    try {
      const dbSessionUser = await prisma.session.findUnique({
        where: { id: session.sessionId, expires: { gt: new Date() } },

        include: {
          user: {
            omit: { password: true },
            include: { profile: { select: { role: true } } },
          },
        },
      });
      if (!dbSessionUser) return null;
      return dbSessionUser as SessionWithUser;
    } catch (error) {
      console.log("Failed to fetch user");
      return null;
    }
  }
);
