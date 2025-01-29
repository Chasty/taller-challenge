import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async validateServices(serviceIds: number[]): Promise<Service[]> {
    const services = await this.servicesRepository.findByIds(serviceIds);

    if (services.length !== serviceIds.length) {
      const foundIds = services.map((service) => service.id);
      const missingIds = serviceIds.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        `Services with IDs ${missingIds.join(', ')} not found`,
      );
    }

    return services;
  }

  async createService(serviceData: Partial<Service>): Promise<Service> {
    const service = this.servicesRepository.create(serviceData);
    return await this.servicesRepository.save(service);
  }
}
