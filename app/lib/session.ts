import { cookies } from "next/headers";

import prisma from "@/prisma/db";
import { decryptSession, encryptSession } from "./sessioncrypto";

export async function createSession(userId: string) {
  try {
    // Calculate expiration date (7 days from now)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // 1. Create a session in the database using Prisma
    const session = await prisma.session.create({
      data: {
        userId,
        expires: expiresAt,
        sessionToken: crypto.randomUUID(),
      },
      select: {
        id: true,
      },
    });

    // 2. Encrypt the session data
    const encryptedSession = await encryptSession({
      sessionId: session.id,
      expiresAt,
    });

    // 3. Store the encrypted session in cookies
    const cookieStore = await cookies();
    cookieStore.set("session", encryptedSession, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });

    return session.id;
  } catch (error) {
    console.error("Error creating session:", error);
    throw new Error("Failed to create session");
  }
}

// Example of session validation middleware/function
export async function getValidSession() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
      return null;
    }

    const session = await decryptSession(sessionCookie.value);

    // Check if session is expired
    if (new Date() > session.expiresAt) {
      return null;
    }

    // Fetch the session from database to ensure it still exists
    const dbSession = await prisma.session.findUnique({
      where: { id: session.sessionId },
      include: {
        user: {
          omit: { password: true },
          include: { profile: { select: { role: true } } },
        },
      },
    });

    return dbSession;
  } catch (error) {
    console.error(error);
    return null;
  }
}
