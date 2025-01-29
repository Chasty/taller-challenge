import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

@InputType()
export class CreateSalonInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  location: string;

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  serviceIds?: number[];
}
