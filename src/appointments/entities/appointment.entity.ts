import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Salon } from '../../salons/entities/salon.entity';
import { Service } from '../../services/entities/service.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column('timestamp')
  appointmentTime: Date;

  @Column()
  salonId: number;

  @Column()
  serviceId: number;

  @ManyToOne(() => Salon)
  @JoinColumn({ name: 'salonId' })
  salon: Salon;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'serviceId' })
  service: Service;
}
