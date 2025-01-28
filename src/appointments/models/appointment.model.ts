import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Appointment {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  customerName: string;

  @Field(() => String)
  serviceName: string;

  @Field(() => Date)
  appointmentTime: Date;

  @Field()
  salonId: number;
}
