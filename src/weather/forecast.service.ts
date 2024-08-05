import { Inject, Injectable } from '@nestjs/common';
import { ForecastData, GetForecastDto } from './dto/forecast.dto';
import { AutoCompleteService } from './auto-complete.service';
import axios from 'axios';
import { GenerateParamsStrService } from './generate-params-str.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as dayjs from 'dayjs';

@Injectable()
export class ForecastService {
  constructor(
    private autoComplete: AutoCompleteService,
    private paramsStr: GenerateParamsStrService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getForeCast(payload: GetForecastDto) {
    try {
      const location_id = payload.location_id
        ? payload.location_id
        : await this.autoComplete.generate(payload);
      const cache = await this.cacheManager.get(
        `forecast-${location_id}-${payload.days}-${dayjs().format('YYYY-MM-DD')}`,
      );
      if (cache) return cache;

      const params_str = this.paramsStr.generate(payload);

      const forecasts = (
        await axios.get(
          `${process.env.WEATHER_API_HOST}/forecast.json?${params_str}`,
        )
      ).data as ForecastData;

      await this.cacheManager.set(
        `forecast-${location_id}-${payload.days}-${dayjs().format('YYYY-MM-DD')}`,
        forecasts,
      );
      return forecasts;
    } catch (err) {
      console.log(err);
      throw new Error('Error');
    }
  }

  async loadCache() {}
  async saveCache() {}
}
