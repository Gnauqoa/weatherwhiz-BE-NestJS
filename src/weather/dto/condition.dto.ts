import { ApiProperty } from '@nestjs/swagger';

export class ConditionDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  code: number;
}
