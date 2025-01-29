import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { SalonsService } from '../salons/salons.service';
import { ServicesService } from 'src/services/services.service';

import { IsInt, IsString, IsDateString } from 'class-validator';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';

export class CreateAppointmentDto {
  @IsInt()
  salonId: number;

  @IsInt()
  serviceId: number;

  @IsString()
  customerName: string;

  @IsDateString()
  appointmentTime: string;
}

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private salonsService: SalonsService,
    private servicesService: ServicesService,
  ) {}

  async createAppointment(dto: CreateAppointmentInput): Promise<Appointment> {
    // Check if salon exists
    const salon = await this.salonsService.findById(dto.salonId);
    if (!salon) {
      throw new NotFoundException('Salon not found');
    }

    const service = await this.servicesService.findById(dto.serviceId);
    if (!salon) {
      throw new NotFoundException('Service not found');
    }

    const appointment = this.appointmentsRepository.create({
      customerName: dto.customerName,
      appointmentTime: new Date(dto.appointmentTime),
      salon,
      service,
    });

    return this.appointmentsRepository.save(appointment);
  }

  async getAppointmentsWithDetails() {
    const appointments = await this.appointmentsRepository.find({
      relations: ['salon', 'service'],
      select: {
        id: true,
        customerName: true,
        appointmentTime: true,
        salonId: true,
        serviceId: true,
        salon: {
          id: true,
          name: true,
          location: true,
        },
        service: {
          id: true,
          name: true,
          price: true,
        },
      },
    });

    return appointments;
  }

  async findOne(id: number): Promise<Appointment> {
    return this.appointmentsRepository.findOne({
      where: { id },
      relations: ['salon', 'salon.services'],
    });
  }

  async updateAppointment(
    updateAppointmentInput: UpdateAppointmentInput,
  ): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id: updateAppointmentInput.id },
    });

    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${updateAppointmentInput.id} not found`,
      );
    }

    if (updateAppointmentInput.salonId) {
      const salon = await this.salonsService.findById(
        updateAppointmentInput.salonId,
      );
      if (!salon) {
        throw new NotFoundException(
          `Salon with ID ${updateAppointmentInput.salonId} not found`,
        );
      }
      appointment.salon = salon;
    }

    if (updateAppointmentInput.serviceId) {
      const service = await this.servicesService.findById(
        updateAppointmentInput.serviceId,
      );
      if (!service) {
        throw new NotFoundException(
          `Service with ID ${updateAppointmentInput.serviceId} not found`,
        );
      }
      appointment.service = service;
    }

    if (updateAppointmentInput.customerName) {
      appointment.customerName = updateAppointmentInput.customerName;
    }

    if (updateAppointmentInput.appointmentTime) {
      appointment.appointmentTime = new Date(
        updateAppointmentInput.appointmentTime,
      );
    }

    return this.appointmentsRepository.save(appointment);
  }

  async deleteAppointment(id: number): Promise<boolean> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    await this.appointmentsRepository.remove(appointment);
    return true;
  }
}
