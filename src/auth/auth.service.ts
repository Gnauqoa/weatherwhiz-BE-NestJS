import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findByAccount(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { user_id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
