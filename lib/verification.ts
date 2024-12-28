import { Redis } from "@upstash/redis";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import { VerificationData } from "@/app/types/auth";
import { getBaseUrl } from "@/app/utils/getBaseUrl";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const transporter = createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

const VERIFY_EMAIL_PREFIX = "verify_email:";
const OTP_EXPIRY = 10 * 60; // 10 minutes
const LINK_EXPIRY = 24 * 60 * 60; // 24 hours
const MAX_OTP_ATTEMPTS = 3;
const RESEND_COOLDOWN = 60; // 1 minute

export class VerificationService {
  private static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private static generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  static async createVerification(email: string): Promise<VerificationData> {
    const token = this.generateToken();
    const otp = this.generateOTP();
    const expires = new Date(Date.now() + LINK_EXPIRY * 1000);

    const verificationData: VerificationData = {
      email,
      token,
      otp,
      expires,
      attempts: 0,
    };

    await redis.set(
      `${VERIFY_EMAIL_PREFIX}${email}`,
      JSON.stringify(verificationData),
      { ex: LINK_EXPIRY }
    );

    return verificationData;
  }

  static async sendVerificationEmail(
    email: string,
    verificationData: VerificationData
  ) {
    const verificationUrl = `${getBaseUrl()}/api/auth/verify?token=${
      verificationData.token
    }`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Verify your email address",
      html: `
        <div>
          <h1>Verify your email address</h1>
          <p>Your verification code is: <strong>${verificationData.otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>Alternatively, click the link below to verify your email address:</p>
          <a href="${verificationUrl}">Verify Email</a>
          <p>This link will expire in 24 hours.</p>
        </div>
      `,
    });
  }

  static async verifyOTP(email: string, otp: string): Promise<boolean> {
    const data: any = await redis.get(`${VERIFY_EMAIL_PREFIX}${email}`);
    //console.log("Redis data: ", data);

    if (!data) return false;

    const verificationData: VerificationData = data;
    //console.log("Redis Verification: ", verificationData);

    if (verificationData.attempts >= MAX_OTP_ATTEMPTS) {
      throw new Error("Maximum verification attempts exceeded");
    }

    // Update attempts
    verificationData.attempts += 1;
    await redis.set(
      `${VERIFY_EMAIL_PREFIX}${email}`,
      JSON.stringify(verificationData),
      { ex: LINK_EXPIRY }
    );

    if (Date.now() > new Date(verificationData.expires).getTime()) {
      throw new Error("OTP has expired");
    }

    return verificationData.otp === otp;
  }

  static async verifyToken(token: string): Promise<string | null> {
    const keys = await redis.keys(`${VERIFY_EMAIL_PREFIX}*`);

    for (const key of keys) {
      const data = await redis.get(key);
      if (!data) continue;

      const verificationData: VerificationData = JSON.parse(
        data as unknown as string
      );
      if (verificationData.token === token) {
        if (Date.now() > new Date(verificationData.expires).getTime()) {
          throw new Error("Verification link has expired");
        }
        return verificationData.email;
      }
    }

    return null;
  }

  static async canResendVerification(
    email: string
  ): Promise<{ canResend: boolean; timeRemaining?: number }> {
    const data = await redis.get(`${VERIFY_EMAIL_PREFIX}${email}`);
    if (!data) return { canResend: true };

    const verificationData: VerificationData = JSON.parse(
      data as unknown as string
    );

    if (!verificationData.lastResent) return { canResend: true };

    const timeSinceLastResend =
      Date.now() - new Date(verificationData.lastResent).getTime();
    const remainingTime = RESEND_COOLDOWN * 1000 - timeSinceLastResend;

    return {
      canResend: remainingTime <= 0,
      timeRemaining: Math.ceil(remainingTime / 1000),
    };
  }
}
