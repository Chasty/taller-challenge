import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async createAppointment(
    appointmentData: Partial<Appointment>,
  ): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create(appointmentData);
    return await this.appointmentsRepository.save(appointment);
  }
}
