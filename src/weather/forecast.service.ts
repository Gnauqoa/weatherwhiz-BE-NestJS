import { Injectable } from '@nestjs/common';
import { ForecastData, GetForecastDto } from './dto/forecast.dto';
import { AutoCompleteService } from './auto-complete.service';
import axios from 'axios';
import { GenerateParamsStrService } from './generate-params-str.service';

@Injectable()
export class ForecastService {
  constructor(
    private autoComplete: AutoCompleteService,
    private paramsStr: GenerateParamsStrService,
  ) {}
  async getForeCast(payload: GetForecastDto) {
    try {
      // const location_id = payload.location_id
      //   ? payload.location_id
      //   : (await this.autoComplete.generate(payload)).data.id;
      const params_str = this.paramsStr.generate(payload);
      const forecasts = (
        await axios.get(
          `${process.env.WEATHER_API_HOST}/forecast.json?${params_str}`,
        )
      ).data as ForecastData;
      // forecasts.forecast.forecastday.map((forecastday) => {
      //   // caching
      // });
      // caching weather forecast

      return forecasts;
    } catch (err) {
      console.log(err);
      throw new Error('Error');
    }
  }

  async loadCache() {}
  async saveCache() {}
}
