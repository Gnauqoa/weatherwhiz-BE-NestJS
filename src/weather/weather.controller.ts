import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('weather')
@ApiTags('weather')
export class WeatherController {
  constructor(private forecastService: ForecastService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('forecast')
  async getForecast(
    @Query('q') q: string = 'London',
    @Query('days') days: number = 1,
  ) {
    return { data: await this.forecastService.getForeCast({ q, days }) };
  }
}
