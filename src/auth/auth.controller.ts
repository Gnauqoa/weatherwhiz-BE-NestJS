import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
  Param,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';

@Controller('users')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Login with email or username' })
  @HttpCode(HttpStatus.OK)
  @Post('sign_in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async signUp(@Body() signUpDto: CreateUserDto) {
    return await this.authService.signUp(signUpDto);
  }

  @ApiOperation({ summary: 'Verifi email' })
  @HttpCode(HttpStatus.OK)
  @Put('/verify/:id/:code')
  async verifyEmail(@Param('id') id: number, @Param('code') code: string) {
    return { data: await this.authService.verifyEmail({ userId: id, code }) };
  }
}
