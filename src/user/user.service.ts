import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '.prisma/client';
import * as bcrypt from 'bcryptjs';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AutoCompleteService } from 'src/weather/auto-complete.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private weatherService: AutoCompleteService,
  ) {}
  async updateNotificationWeather(payload: {
    q?: string;
    notification_each_day?: boolean;
    user_id: number;
  }) {
    const data: {
      location_query?: string;
      notification_each_day?: boolean;
      location_id?: number;
    } = {};
    if (payload.q) {
      data.location_id = Number(
        await this.weatherService.generate({
          q: payload.q,
        }),
      );
      data.location_query = payload.q;
    }
    if (payload.notification_each_day) {
      data.notification_each_day = payload.notification_each_day;
    }
    await this.prisma.user.update({
      where: {
        id: payload.user_id,
      },
      data,
    });

    return { data: { message: 'Notification data updated successfully' } };
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const prisma = this.prisma;
    await this.validateNewUser(createUserDto.email, createUserDto.username);
    const hashedPassword = await bcrypt.hashSync(createUserDto.password, 10);
    return await prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
  }

  async validateNewUser(email: string, username: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (user) {
      throw new HttpException(
        ['Email or username already exists'],
        HttpStatus.CONFLICT,
      );
    }
    return true;
  }

  async findByAccount(account: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: account }, { username: account }],
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async updatePassword(id: number, updatePasswordDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: updatePasswordDto.password,
      },
    });
  }
}
