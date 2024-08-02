import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/common/database/entities/user.entity';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
    const user = await this.usersService.create(payload);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.signAsync({
        user_id: user.id,
      }),
    };
  }
}
