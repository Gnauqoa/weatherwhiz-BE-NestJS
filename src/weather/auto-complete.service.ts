import { GenerateParamsStrService } from './generate-params-str.service';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { AutoCompleteDto } from './dto/auto-complete.dto';

@Injectable()
export class AutoCompleteService {
  constructor(private generateParamsStr: GenerateParamsStrService) {}

  async generate(params: AutoCompleteDto) {
    const params_str = this.generateParamsStr.create(params);
    return await axios.get(
      `${process.env.WEATHER_API_KEY}/search.json?${params_str}`,
    );
  }
}
