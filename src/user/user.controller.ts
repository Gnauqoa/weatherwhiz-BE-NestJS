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
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('current')
  async getCurrent(@Req() request: Request) {
    return request['user'];
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
}
