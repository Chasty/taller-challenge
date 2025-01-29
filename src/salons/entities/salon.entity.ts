import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('salons')
export class Salon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  location: string;

  @OneToMany(() => Service, (service) => service.salon, { cascade: true })
  services: Service[];

  @OneToMany(() => Appointment, (appointment) => appointment.salon)
  appointments: Appointment[];
}
