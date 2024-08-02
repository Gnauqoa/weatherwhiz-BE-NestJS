import { IsEmail } from 'class-validator';

export class SendVerificationEmailDto {
  @IsEmail()
  to: string;
  subject: string;
  fullName: string;
  FE_URL: string;
  verificationCode: string;
  userId: string;
}
