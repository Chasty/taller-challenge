import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Salon } from '../../salons/entities/salon.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  serviceName: string;

  @Column('timestamp')
  appointmentTime: Date;

  @ManyToOne(() => Salon, (salon) => salon.appointments)
  salon: Salon;

  @Column()
  salonId: number;
}
