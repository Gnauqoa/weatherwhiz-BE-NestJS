import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'quanglng2022@gmail.com',
    description: 'Email or username',
  })
  @IsString()
  @IsNotEmpty()
  account: string;

  @ApiProperty({ example: 'quang' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
