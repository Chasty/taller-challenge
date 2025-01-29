import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

@InputType()
export class UpdateAppointmentInput {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  customerName?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsDateString()
  appointmentTime?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  salonId?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  serviceId?: number;
}
