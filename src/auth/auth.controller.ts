import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ groups: ['auth'] })
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Login with email or username' })
  @HttpCode(HttpStatus.OK)
  @Post('sign_in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }
}
