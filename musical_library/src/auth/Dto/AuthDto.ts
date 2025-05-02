import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'access token of request',
    type: String,
  })
  @IsString()
  access_token: string;

  @ApiProperty({
    description: 'token type',
    type: String,
  })
  @IsString()
  token_type: string;

  @ApiProperty({
    description: 'date of expiration',
    type: String,
  })
  @IsString()
  expires_in: number;

  @ApiProperty({
    description: 'success of request',
    type: String,
  })
  @IsString()
  refresh_token: string;

  @ApiProperty({
    description: 'success of request',
    type: String,
  })
  @IsString()
  scope: string;

}