export interface VerificationData {
  email: string;
  token: string;
  otp: string;
  expires: Date;
  attempts: number;
  lastResent?: Date;
}
