import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Service } from './models/service.model';
import { ServicesService } from './services.service';
import { CreateServiceInput } from './dto/create-service.input';

@Resolver(() => Service)
export class ServicesResolver {
  constructor(private servicesService: ServicesService) {}

  @Query(() => [Service])
  async services(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Mutation(() => Service)
  async createService(
    @Args('createServiceInput') createServiceInput: CreateServiceInput,
  ): Promise<Service> {
    return this.servicesService.createService(createServiceInput);
  }
}
