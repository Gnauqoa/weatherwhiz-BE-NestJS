import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { MailerService } from 'src/common/mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from './verification.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { generateRandomHexString } from 'src/utils/random';
import * as dayjs from 'dayjs';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource, // Inject DataSource
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create the user
      const user = await this.usersService.create(payload, queryRunner.manager);
      if (!user) {
        throw new UnauthorizedException();
      }

      // Create verification and send email
      await this.sendVerificationEmail(user, queryRunner.manager);

      await queryRunner.commitTransaction();

      return {
        access_token: await this.jwtService.signAsync({
          user_id: user.id,
        }),
      };
    } catch (err) {
      console.log('Rollback signUp');
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async sendVerificationEmail(user: User, manager?: EntityManager) {
    const verificationRepository = manager
      ? manager.getRepository(Verification)
      : this.verificationRepository;
    const verification = await verificationRepository.findOne({
      where: { user: user },
      order: { createdAt: 'DESC' },
    });

    if (verification) {
      verification.active = false;
      await verificationRepository.save(verification);
      return verification;
    }

    const newVerification = await verificationRepository.save(
      verificationRepository.create({
        user_id: user.id,
        verification_code: generateRandomHexString(10),
        expires_in: dayjs().add(5, 'minute').toDate(),
        active: false,
      }),
    );

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
    const verification = await this.verificationRepository.findOne({
      where: { user_id: payload.userId, verification_code: payload.code },
    });

    if (!verification) {
      throw new UnauthorizedException('Invalid verification code');
    }

    if (verification.expires_in < new Date()) {
      throw new UnauthorizedException('Verification code has expired');
    }

    verification.active = true;
    await this.verificationRepository.save(verification);

    const user = await this.usersService.findOne(verification.user_id);
    user.verified = true;

    return {
      message: 'Email verified successfully',
    };
  }
}
