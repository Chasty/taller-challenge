import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Salon } from '../../salons/entities/salon.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Salon, (salon) => salon.services)
  salon: Salon;

  @Column()
  salonId: number;
}
