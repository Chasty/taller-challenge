import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonsResolver } from './salons.resolver';
import { Salon } from './entities/salon.entity';
import { SalonsService } from './salons.service';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Salon]),
    forwardRef(() => ServicesModule),
  ],
  providers: [SalonsResolver, SalonsService],
  exports: [SalonsService],
})
export class SalonsModule {}
