import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';
import { SalonsService } from '../salons/salons.service';
import { ServicesService } from '../services/services.service';
import { NotFoundException } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let appointmentRepository: Repository<Appointment>;
  let salonsService: SalonsService;
  let servicesService: ServicesService;

  const mockAppointment = {
    id: 1,
    customerName: 'John Doe',
    appointmentTime: new Date(),
    salon: { id: 1, name: 'Test Salon' },
    service: { id: 1, name: 'Haircut' },
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockSalonsService = {
    findById: jest.fn(),
  };

  const mockServicesService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: mockRepository,
        },
        {
          provide: SalonsService,
          useValue: mockSalonsService,
        },
        {
          provide: ServicesService,
          useValue: mockServicesService,
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    appointmentRepository = module.get<Repository<Appointment>>(
      getRepositoryToken(Appointment),
    );
    salonsService = module.get<SalonsService>(SalonsService);
    servicesService = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAppointment', () => {
    const createAppointmentDto: CreateAppointmentInput = {
      customerName: 'John Doe',
      appointmentTime: new Date('2024-03-20T10:00:00Z'),
      salonId: 1,
      serviceId: 1,
    };

    it('should create an appointment successfully', async () => {
      mockSalonsService.findById.mockResolvedValue({ id: 1 });
      mockServicesService.findById.mockResolvedValue({ id: 1 });
      mockRepository.create.mockReturnValue(mockAppointment);
      mockRepository.save.mockResolvedValue(mockAppointment);

      const result = await service.createAppointment(createAppointmentDto);

      expect(result).toEqual(mockAppointment);
      expect(mockSalonsService.findById).toHaveBeenCalledWith(1);
      expect(mockServicesService.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when salon not found', async () => {
      mockSalonsService.findById.mockResolvedValue(null);

      await expect(
        service.createAppointment(createAppointmentDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAppointmentsWithDetails', () => {
    it('should return appointments with details', async () => {
      mockRepository.find.mockResolvedValue([mockAppointment]);

      const result = await service.getAppointmentsWithDetails();

      expect(result).toEqual([mockAppointment]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('updateAppointment', () => {
    const updateAppointmentDto: UpdateAppointmentInput = {
      id: 1,
      customerName: 'Jane Doe',
    };

    it('should update an appointment successfully', async () => {
      mockRepository.findOne.mockResolvedValue(mockAppointment);
      mockRepository.save.mockResolvedValue({
        ...mockAppointment,
        customerName: 'Jane Doe',
      });

      const result = await service.updateAppointment(updateAppointmentDto);

      expect(result.customerName).toBe('Jane Doe');
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when appointment not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.updateAppointment(updateAppointmentDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteAppointment', () => {
    it('should delete an appointment successfully', async () => {
      mockRepository.findOne.mockResolvedValue(mockAppointment);
      mockRepository.remove.mockResolvedValue(mockAppointment);

      const result = await service.deleteAppointment(1);

      expect(result).toBe(true);
      expect(mockRepository.remove).toHaveBeenCalled();
    });

    it('should throw NotFoundException when appointment not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteAppointment(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
