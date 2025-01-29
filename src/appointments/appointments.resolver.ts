import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Appointment } from './models/appointment.model';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private appointmentsService: AppointmentsService) {}

  @Query(() => [Appointment])
  async appointments(): Promise<Appointment[]> {
    return this.appointmentsService.getAppointmentsWithDetails();
  }

  @Query(() => Appointment)
  async appointment(@Args('id') id: number): Promise<Appointment> {
    return this.appointmentsService.findOne(id);
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentsService.createAppointment(createAppointmentInput);
  }

  @Mutation(() => Appointment)
  async updateAppointment(
    @Args('updateAppointmentInput')
    updateAppointmentInput: UpdateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentsService.updateAppointment(updateAppointmentInput);
  }
}
