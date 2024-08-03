import { IsString, IsNotEmpty } from 'class-validator';

export class AutoCompleteDto {
  @IsString()
  @IsNotEmpty()
  q: string;
}
