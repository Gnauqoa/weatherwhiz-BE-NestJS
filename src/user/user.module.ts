import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { AutoCompleteService } from 'src/weather/auto-complete.service';
import { GenerateParamsStrService } from 'src/weather/generate-params-str.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UsersService,
    PrismaService,
    AutoCompleteService,
    GenerateParamsStrService,
  ],
  exports: [UsersService],
})
export class UserModule {}
