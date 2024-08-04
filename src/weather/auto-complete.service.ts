import { GenerateParamsStrService } from './generate-params-str.service';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { AutoCompleteDto } from './dto/auto-complete.dto';

@Injectable()
export class AutoCompleteService {
  constructor(private generateParamsStr: GenerateParamsStrService) {}

  async generate(params: AutoCompleteDto): Promise<string> {
    const params_str = this.generateParamsStr.generate(params);
    const result = (await axios.get(
      `${process.env.WEATHER_API_HOST}/search.json?${params_str}`,
    )) as { data: { id: string }[] };
    return result.data[0].id;
  }
}
