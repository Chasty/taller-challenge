import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentsResolver } from './appointments.resolver';
import { SalonsModule } from '../salons/salons.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    SalonsModule,
    ServicesModule,
  ],
  providers: [AppointmentsService, AppointmentsResolver],
})
export class AppointmentsModule {}
