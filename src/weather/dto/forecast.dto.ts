import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ConditionDto } from './condition.dto';
import { Type } from 'class-transformer';
import { CurrentDto } from './current.dto';

export class GetForecastDto {
  @IsString()
  q: string;

  @IsString()
  days: number;

  @IsString()
  location_id?: number;
}
export class DayDto {
  @IsNumber()
  maxtemp_c: number;

  @IsNumber()
  maxtemp_f: number;

  @IsNumber()
  mintemp_c: number;

  @IsNumber()
  mintemp_f: number;

  @IsNumber()
  avgtemp_c: number;

  @IsNumber()
  avgtemp_f: number;

  @IsNumber()
  maxwind_mph: number;

  @IsNumber()
  maxwind_kph: number;

  @IsNumber()
  totalprecip_mm: number;

  @IsNumber()
  totalprecip_in: number;

  @IsNumber()
  totalsnow_cm: number;

  @IsNumber()
  avgvis_km: number;

  @IsNumber()
  avgvis_miles: number;

  @IsNumber()
  avghumidity: number;

  @IsNumber()
  daily_will_it_rain: number;

  @IsNumber()
  daily_chance_of_rain: number;

  @IsNumber()
  daily_will_it_snow: number;

  @IsNumber()
  daily_chance_of_snow: number;

  @ValidateNested()
  @Type(() => ConditionDto)
  condition: ConditionDto;

  @IsNumber()
  uv: number;
}

export class Astro {
  @IsString()
  sunrise: string;

  @IsString()
  sunset: string;

  @IsString()
  moonrise: string;

  @IsString()
  moonset: string;

  @IsString()
  moon_phase: string;

  @IsNumber()
  moon_illumination: number;

  @IsNumber()
  is_moon_up: number;

  @IsNumber()
  is_sun_up: number;
}

class Hour {
  @IsNumber()
  time_epoch: number;

  @IsString()
  time: string;

  @IsNumber()
  temp_c: number;

  @IsNumber()
  temp_f: number;

  @IsNumber()
  is_day: number;

  @ValidateNested()
  @Type(() => ConditionDto)
  condition: ConditionDto;

  @IsNumber()
  wind_mph: number;

  @IsNumber()
  wind_kph: number;

  @IsNumber()
  wind_degree: number;

  @IsString()
  wind_dir: string;

  @IsNumber()
  pressure_mb: number;

  @IsNumber()
  pressure_in: number;

  @IsNumber()
  precip_mm: number;

  @IsNumber()
  precip_in: number;

  @IsNumber()
  snow_cm: number;

  @IsNumber()
  humidity: number;

  @IsNumber()
  cloud: number;

  @IsNumber()
  feelslike_c: number;

  @IsNumber()
  feelslike_f: number;

  @IsNumber()
  windchill_c: number;

  @IsNumber()
  windchill_f: number;

  @IsNumber()
  heatindex_c: number;

  @IsNumber()
  heatindex_f: number;

  @IsNumber()
  dewpoint_c: number;

  @IsNumber()
  dewpoint_f: number;

  @IsNumber()
  will_it_rain: number;

  @IsNumber()
  chance_of_rain: number;

  @IsNumber()
  will_it_snow: number;

  @IsNumber()
  chance_of_snow: number;

  @IsNumber()
  vis_km: number;

  @IsNumber()
  vis_miles: number;

  @IsNumber()
  gust_mph: number;

  @IsNumber()
  gust_kph: number;

  @IsNumber()
  uv: number;
}

class ForecastDay {
  @IsString()
  date: string;

  @IsNumber()
  date_epoch: number;

  @ValidateNested()
  @Type(() => DayDto)
  day: DayDto;

  @ValidateNested()
  @Type(() => Astro)
  astro: Astro;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Hour)
  hour: Hour[];
}

export class Forecast {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ForecastDay)
  forecastday: ForecastDay[];
}

export class ForecastData {
  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @ValidateNested()
  @Type(() => CurrentDto)
  current: CurrentDto;

  @ValidateNested()
  @Type(() => Forecast)
  forecast: Forecast;
}
