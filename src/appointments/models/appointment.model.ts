import { Field, ObjectType } from '@nestjs/graphql';
import { Salon } from '../../salons/models/salon.model';
import { Service } from '../../services/models/service.model';

@ObjectType()
export class Appointment {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  customerName: string;

  @Field(() => Date)
  appointmentTime: Date;

  @Field(() => Salon)
  salon: Salon;

  @Field(() => Service)
  service: Service;
}
