import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field()
  customerName: string;

  @Field()
  appointmentTime: Date;

  @Field()
  salonId: number;

  @Field()
  serviceId: number;
}
