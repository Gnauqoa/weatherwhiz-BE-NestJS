import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/user/user.service';
import { MailerService } from 'src/common/mailer/mailer.service';

@Module({
  providers: [AuthService, PrismaService, UsersService, MailerService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
})
export class AuthModule {}
