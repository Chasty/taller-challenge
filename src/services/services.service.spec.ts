import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { SalonsService } from '../salons/salons.service';
import { NotFoundException } from '@nestjs/common';
import { CreateServiceInput } from './dto/create-service.input';

describe('ServicesService', () => {
  let service: ServicesService;
  let serviceRepository: Repository<Service>;
  let salonsService: SalonsService;

  const mockService = {
    id: 1,
    name: 'Haircut',
    price: 29.99,
    salon: { id: 1 },
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findByIds: jest.fn(),
  };

  const mockSalonsService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: getRepositoryToken(Service),
          useValue: mockRepository,
        },
        {
          provide: SalonsService,
          useValue: mockSalonsService,
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    serviceRepository = module.get<Repository<Service>>(
      getRepositoryToken(Service),
    );
    salonsService = module.get<SalonsService>(SalonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a service by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockService);

      const result = await service.findById(1);

      expect(result).toEqual(mockService);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['salon'],
      });
    });

    it('should throw NotFoundException when service not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createService', () => {
    const createServiceDto: CreateServiceInput = {
      name: 'Haircut',
      price: 29.99,
      salonId: 1,
    };

    it('should create a service successfully', async () => {
      mockSalonsService.findById.mockResolvedValue({ id: 1 });
      mockRepository.create.mockReturnValue(mockService);
      mockRepository.save.mockResolvedValue(mockService);

      const result = await service.createService(createServiceDto);

      expect(result).toEqual(mockService);
      expect(mockSalonsService.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when salon not found', async () => {
      mockSalonsService.findById.mockResolvedValue(null);

      await expect(service.createService(createServiceDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
