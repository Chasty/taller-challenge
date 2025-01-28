import { Module } from '@nestjs/common';
import { SalonsResolver } from './salons.resolver';

@Module({
  imports: [],
  providers: [SalonsResolver],
  exports: [SalonsResolver],
})
export class SalonsModule {}
