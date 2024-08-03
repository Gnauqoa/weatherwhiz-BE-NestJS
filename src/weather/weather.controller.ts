import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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
  async getForecast(@Param('q') q: string, @Param('days') days: number) {
    return await this.forecastService.getForeCast({ q, days });
  }
}
