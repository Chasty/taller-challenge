import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Appointment } from './models/appointment.model';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private appointmentsService: AppointmentsService) {}

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentsService.createAppointment(createAppointmentInput);
  }
}
