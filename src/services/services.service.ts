import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { SalonsService } from '../salons/salons.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @Inject(forwardRef(() => SalonsService))
    private salonsService: SalonsService,
  ) {}

  async findById(id: number): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['salon'],
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

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

  async createService(
    createServiceInput: CreateServiceInput,
  ): Promise<Service> {
    const salon = await this.salonsService.findById(createServiceInput.salonId);
    if (!salon) {
      throw new NotFoundException(
        `Salon with ID ${createServiceInput.salonId} not found`,
      );
    }

    const service = this.servicesRepository.create({
      name: createServiceInput.name,
      price: createServiceInput.price,
      salon: salon,
    });

    return await this.servicesRepository.save(service);
  }
}
