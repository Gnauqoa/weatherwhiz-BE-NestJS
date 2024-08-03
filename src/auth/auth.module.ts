import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MailerModule } from 'src/common/mailer/mailer.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  imports: [
    UserModule,
    MailerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
})
export class AuthModule {}
