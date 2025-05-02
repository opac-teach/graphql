import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @ApiProperty({ example: 'tristan' })
  @IsString()
  @Field()
  username: string;

  @ApiProperty({ example: 'tristan@email.com' })
  @IsEmail()
  @Field()
  email: string;

  @ApiProperty({ example: 'motdepasse123' })
  @IsString()
  @MinLength(6)
  @Field()
  password: string;

  @ApiProperty({ example: 'Fan de chats' })
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;
}
