import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import {
  UpdateUserDto,
  UpdateUserNotificationWeatherDto,
} from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('current')
  async getCurrent(@Req() request: Request) {
    const user = request['user'];
    delete user.password;
    return { data: user };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('current')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('notification_weather')
  async updateNotificationWeather(
    @Body() payload: UpdateUserNotificationWeatherDto,
    @Req() request: Request,
  ) {
    return {
      data: await this.usersService.updateNotificationWeather({
        user_id: request['user'].id,
        ...payload,
      }),
    };
  }
}
