import { Inject, Injectable } from '@nestjs/common';
import { AutoCompleteService } from './auto-complete.service';
import axios from 'axios';
import { GenerateParamsStrService } from './generate-params-str.service';
import { ForecastData } from './dto/forecast.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import * as dayjs from 'dayjs';

@Injectable()
export class CurrentWeatherService {
  constructor(
    private autoComplete: AutoCompleteService,
    private generateParamsStr: GenerateParamsStrService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCurrentWeather(payload: { location_id?: number; q: string }) {
    const location_id =
      payload.location_id || this.autoComplete.generate({ q: payload.q });
    //load cache data
    const cache = await this.cacheManager.get(
      `current-${location_id}-${dayjs().format('YYYY-MM-DD')}`,
    );
    if (cache) return cache as ForecastData;
    const params_str = this.generateParamsStr.generate({
      q: payload.q,
      days: 1,
    });

    const result = await axios.get(
      `${process.env.WEATHER_API_HOST}/forecast.json?${params_str}`,
    );
    await this.cacheManager.set(
      `current-${location_id}-${dayjs().format('YYYY-MM-DD')}`,
      result.data,
    );
    return result.data as ForecastData;
  }
}
