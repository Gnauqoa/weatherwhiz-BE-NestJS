import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './verification.entity';
import { MailerModule } from 'src/common/mailer/mailer.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UserModule,
    MailerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    TypeOrmModule.forFeature([Verification]),
  ],
})
export class AuthModule {}
