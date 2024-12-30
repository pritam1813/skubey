import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

// Place these in your .env file
// Generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string; // Must be 32 bytes (64 chars in hex)
const ENCRYPTION_IV_LENGTH = 16; // For AES, this is always 16 bytes

interface SessionData {
  sessionId: string;
  expiresAt: Date;
}

export async function encryptSession({
  sessionId,
  expiresAt,
}: SessionData): Promise<string> {
  try {
    // Generate a random IV
    const iv = randomBytes(ENCRYPTION_IV_LENGTH);

    // Create cipher with AES-256-GCM
    const cipher = createCipheriv(
      "aes-256-gcm",
      Buffer.from(ENCRYPTION_KEY, "hex"),
      iv
    );

    // Convert session data to string
    const sessionData = JSON.stringify({
      sessionId,
      expiresAt: expiresAt.toISOString(),
    });

    // Encrypt the data
    let encryptedData = cipher.update(sessionData, "utf8", "hex");
    encryptedData += cipher.final("hex");

    // Get the auth tag
    const authTag = cipher.getAuthTag();

    // Combine IV, encrypted data, and auth tag
    const result = JSON.stringify({
      iv: iv.toString("hex"),
      data: encryptedData,
      tag: authTag.toString("hex"),
    });

    // Base64 encode the result for cookie storage
    return Buffer.from(result).toString("base64");
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt session data");
  }
}

export async function decryptSession(
  encryptedSession: string
): Promise<SessionData> {
  try {
    // Decode the base64 string
    const encrypted = JSON.parse(
      Buffer.from(encryptedSession, "base64").toString()
    );

    // Create decipher
    const decipher = createDecipheriv(
      "aes-256-gcm",
      Buffer.from(ENCRYPTION_KEY, "hex"),
      Buffer.from(encrypted.iv, "hex")
    );

    // Set auth tag
    decipher.setAuthTag(Buffer.from(encrypted.tag, "hex"));

    // Decrypt the data
    let decrypted = decipher.update(encrypted.data, "hex", "utf8");
    decrypted += decipher.final("utf8");

    // Parse the decrypted data
    const sessionData = JSON.parse(decrypted);

    return {
      sessionId: sessionData.sessionId,
      expiresAt: new Date(sessionData.expiresAt),
    };
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt session data");
  }
}

// Utility to validate session
export async function validateSession(
  encryptedSession: string
): Promise<boolean> {
  try {
    const session = await decryptSession(encryptedSession);
    const now = new Date();

    return session.expiresAt > now;
  } catch {
    return false;
  }
}
