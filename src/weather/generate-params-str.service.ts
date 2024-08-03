import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateParamsStrService {
  constructor() {}

  generate(params: object): string {
    params = { ...params, key: process.env.WEATHER_API_KEY };
    let paramsString = '';
    for (const [key, value] of Object.entries(params)) {
      paramsString += `${key}=${value}&`;
    }
    return paramsString;
  }
}
