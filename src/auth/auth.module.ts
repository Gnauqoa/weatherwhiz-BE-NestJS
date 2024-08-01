import { Module } from '@nestjs/common';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [LoginService, RegisterService],
  controllers: [AuthController],
})
export class AuthModule {}
