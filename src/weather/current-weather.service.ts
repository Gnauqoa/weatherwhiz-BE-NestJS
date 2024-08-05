import { Injectable } from '@nestjs/common';
import { AutoCompleteService } from './auto-complete.service';
import axios from 'axios';
import { GenerateParamsStrService } from './generate-params-str.service';
import { ForecastData } from './dto/forecast.dto';

@Injectable()
export class CurrentWeatherService {
  constructor(
    private autoComplete: AutoCompleteService,
    private generateParamsStr: GenerateParamsStrService,
  ) {}

  async getCurrentWeather(payload: { location_id?: number; q: string }) {
    // const location_id =
    //   payload.location_id || this.autoComplete.generate({ q: payload.q });
    //load cache data
    const params_str = this.generateParamsStr.generate({
      q: payload.q,
      days: 1,
    });

    const result = await axios.get(
      `${process.env.WEATHER_API_HOST}/forecast.json?${params_str}`,
    );

    return result.data as ForecastData;
  }
}
