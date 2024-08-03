import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';
import { MailerService } from 'src/common/mailer/mailer.service';
import { PrismaService } from 'src/prisma.service';
import { generateRandomHexString } from 'src/utils/random';
import dayjs from 'dayjs';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService, // Inject PrismaService
  ) {}

  async signIn(payload: SignInDto) {
    const user = await this.validateUser(payload);

    return {
      access_token: await this.jwtService.signAsync({ user_id: user.id }),
    };
  }

  async validateUser(payload: SignInDto): Promise<User> {
    const user = await this.usersService.findByAccount(payload.account);
    if (user && (await bcrypt.compare(payload.password, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async signUp(payload: CreateUserDto) {
    // Create the user
    const user = await this.usersService.create(payload);
    if (!user) {
      throw new UnauthorizedException();
    }

    // Create verification and send email
    await this.sendVerificationEmail(user);

    return {
      access_token: await this.jwtService.signAsync({
        user_id: user.id,
      }),
    };
  }

  async sendVerificationEmail(user: User) {
    const prisma = this.prisma;
    const verification = await prisma.verification.findFirst({
      where: { user: { id: user.id } },
      orderBy: { created_at: 'desc' },
    });

    if (verification) {
      verification.active = false;
      await prisma.verification.update({
        where: { id: verification.id },
        data: { active: false },
      });
      return verification;
    }

    const newVerification = await prisma.verification.create({
      data: {
        user: { connect: { id: user.id } },
        verification_code: generateRandomHexString(10),
        expired_at: dayjs().add(5, 'minute').toDate(),
        active: false,
      },
    });

    await this.mailerService.sendVerificationMail({
      to: user.email,
      subject: 'Verify your email',
      fullName: user.first_name + ' ' + user.last_name,
      FE_URL: process.env.FE_URL,
      verificationCode: newVerification.verification_code,
      userId: user.id.toString(),
    });
  }

  async verifyEmail(payload: VerifyEmailDto) {
    const verification = await this.prisma.verification.findFirst({
      where: { user_id: payload.userId, verification_code: payload.code },
    });

    if (!verification) {
      throw new UnauthorizedException('Invalid verification code');
    }

    if (verification.expired_at < new Date()) {
      throw new UnauthorizedException('Verification code has expired');
    }

    await this.prisma.verification.update({
      where: { id: verification.id },
      data: { active: true },
    });

    const user = await this.usersService.findOne(verification.user_id);
    user.verified = true;

    return {
      message: 'Email verified successfully',
    };
  }
}
