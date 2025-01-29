import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalonsService } from './salons.service';
import { Salon } from './entities/salon.entity';
import { ServicesService } from '../services/services.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('SalonsService', () => {
  let service: SalonsService;
  let salonRepository: Repository<Salon>;

  const mockSalon = {
    id: 1,
    name: 'Test Salon',
    location: 'Test Location',
    services: [],
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockServicesService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalonsService,
        {
          provide: getRepositoryToken(Salon),
          useValue: mockRepository,
        },
        {
          provide: ServicesService,
          useValue: mockServicesService,
        },
      ],
    }).compile();

    service = module.get<SalonsService>(SalonsService);
    salonRepository = module.get<Repository<Salon>>(getRepositoryToken(Salon));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a salon by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockSalon);

      const result = await service.findById(1);

      expect(result).toEqual(mockSalon);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['services'],
      });
    });

    it('should throw NotFoundException when salon not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createSalon', () => {
    const createSalonDto = {
      name: 'Test Salon',
      location: 'Test Location',
    };

    it('should create a salon successfully', async () => {
      mockRepository.create.mockReturnValue(mockSalon);
      mockRepository.save.mockResolvedValue(mockSalon);
      mockRepository.findOne.mockResolvedValue(mockSalon);

      const result = await service.createSalon(createSalonDto);

      expect(result).toEqual(mockSalon);
    });

    it('should throw BadRequestException when name is missing', async () => {
      await expect(
        service.createSalon({ location: 'Test Location' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when location is missing', async () => {
      await expect(service.createSalon({ name: 'Test Salon' })).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
