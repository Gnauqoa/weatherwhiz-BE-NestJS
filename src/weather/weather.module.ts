import { Module } from '@nestjs/common';
import { AutoCompleteService } from './auto-complete.service';
import { ForecastService } from './forecast.service';
import { GenerateParamsStrService } from './generate-params-str.service';
import { WeatherController } from './weather.controller';
import { UsersService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { CurrentWeatherService } from './current-weather.service';

@Module({
  providers: [
    ForecastService,
    AutoCompleteService,
    GenerateParamsStrService,
    UsersService,
    PrismaService,
    CurrentWeatherService,
  ],
  exports: [
    CurrentWeatherService,
    ForecastService,
    AutoCompleteService,
    GenerateParamsStrService,
  ],
  controllers: [WeatherController],
})
export class WeatherModule {}
