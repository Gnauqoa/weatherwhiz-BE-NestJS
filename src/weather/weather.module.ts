import { Module } from '@nestjs/common';
import { AutoCompleteService } from './auto-complete.service';
import { ForecastService } from './forecast.service';
import { CurrentService } from './current.service';
import { GenerateParamsStrService } from './generate-params-str.service';

@Module({
  providers: [
    ForecastService,
    AutoCompleteService,
    CurrentService,
    GenerateParamsStrService,
  ],
})
export class WeatherModule {}
