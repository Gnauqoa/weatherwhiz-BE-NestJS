import { Module } from '@nestjs/common';
import { AutoCompleteService } from './auto-complete.service';
import { ForecastService } from './forecast.service';
import { CurrentService } from './current.service';
import { GenerateParamsStrService } from './generate-params-str.service';
import { WeatherController } from './weather.controller';
import { UsersService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    ForecastService,
    AutoCompleteService,
    CurrentService,
    GenerateParamsStrService,
    UsersService,
    PrismaService,
  ],
  controllers: [WeatherController],
})
export class WeatherModule {}
