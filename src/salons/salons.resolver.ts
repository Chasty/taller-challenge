import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Salon } from './models/salon.model';
import { CreateSalonInput } from './dto/create-salon.input';
import { SalonsService } from './salons.service';

@Resolver(() => Salon)
export class SalonsResolver {
  constructor(private salonsService: SalonsService) {}

  @Mutation(() => Salon)
  async createSalon(
    @Args('createSalonInput')
    createSalonInput: CreateSalonInput,
  ): Promise<Salon> {
    return this.salonsService.createSalon(createSalonInput);
  }

  @Query(() => [Salon])
  async getSalons(): Promise<Salon[]> {
    // Temporary mock data
    return [
      {
        id: 1,
        name: 'Test Saloxn',
        location: 'A test salon',
      },
    ];
  }
}
