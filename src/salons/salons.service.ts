import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salon } from './entities/salon.entity';
import { ServicesService } from '../services/services.service';

@Injectable()
export class SalonsService {
  constructor(
    @InjectRepository(Salon)
    private salonsRepository: Repository<Salon>,
    private servicesService: ServicesService,
  ) {}

  async findById(id: number): Promise<Salon> {
    const salon = await this.salonsRepository.findOne({
      where: { id },
      relations: ['services'],
    });
    if (!salon) {
      throw new NotFoundException(`Salon with ID ${id} not found`);
    }
    return salon;
  }

  async createSalon(salonData: Partial<Salon>): Promise<Salon> {
    if (!salonData.name) {
      throw new BadRequestException('Salon name is required');
    }
    if (!salonData.location) {
      throw new BadRequestException('Salon location is required');
    }

    const salon = this.salonsRepository.create({
      name: salonData.name,
      location: salonData.location,
    });

    const savedSalon = await this.salonsRepository.save(salon);

    if (salonData.services && salonData.services.length > 0) {
      const serviceIds = salonData.services.map((service) => service.id);
      await this.servicesService.validateServices(serviceIds);

      await Promise.all(
        serviceIds.map((serviceId) =>
          this.servicesService.createService({
            id: serviceId,
            salonId: savedSalon.id,
          }),
        ),
      );
    }

    return this.findById(savedSalon.id);
  }
}
