import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { SalonsService } from '../salons/salons.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private salonsService: SalonsService,
  ) {}

  async createAppointment(
    appointmentData: Partial<Appointment>,
  ): Promise<Appointment> {
    await this.salonsService.findById(appointmentData.salonId);

    const appointment = this.appointmentsRepository.create(appointmentData);
    return await this.appointmentsRepository.save(appointment);
  }
}
