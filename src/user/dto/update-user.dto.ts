import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class UpdateUserNotificationWeatherDto {
  @ApiProperty({ example: 'Karachi' })
  @IsString()
  q?: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  notification_each_day?: boolean;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  last_name?: string;

  @ApiProperty({ example: '03001234567' })
  @IsString()
  phone?: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsString()
  birth?: Date;

  @ApiProperty({ example: 'Karachi' })
  @IsString()
  location_query?: string;

  @ApiProperty({ example: '12345' })
  @IsNumber()
  location_id?: number;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  notification_each_day?: boolean;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @IsNotEmpty()
  password?: string;
}
