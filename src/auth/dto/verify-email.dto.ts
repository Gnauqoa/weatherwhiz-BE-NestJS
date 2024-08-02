import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'User ID',
  })
  @IsString()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Verification code' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
