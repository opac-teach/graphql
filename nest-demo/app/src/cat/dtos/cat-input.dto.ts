import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import {
  InputType,
  Field,
  Int,
  PartialType,
  OmitType,
} from '@nestjs/graphql';

@InputType()
export class CreateCatDto {
  @ApiProperty({
    description: 'The name of the cat',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @ApiProperty({
    description: 'The age of the cat',
    type: Number,
  })
  @IsNumber()
  @Min(0)
  @Field(() => Int)
  age: number;

  @ApiProperty({
    description: 'The UUID of the breed of the cat',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  @Field()
  breedId: string;
}

@InputType()
export class UpdateCatDto extends PartialType(
  OmitType(CreateCatDto, ['breedId'] as const),
) {}
