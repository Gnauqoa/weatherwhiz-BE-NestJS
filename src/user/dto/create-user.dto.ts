import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Le Dang' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Quang' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: '0388999999' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: new Date() })
  @IsString()
  @IsNotEmpty()
  birth: string;

  @ApiProperty({ example: 'quanglng2022@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'quang' })
  @IsString()
  @IsNotEmpty()
  password: string;

  confirm_password: string;
  @ApiProperty({ example: 'quang' })
  @IsString()
  @IsNotEmpty()
  username: string;
}
