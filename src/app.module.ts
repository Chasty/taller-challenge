import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonsModule } from './salons/salons.module';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { Salon } from './salons/entities/salon.entity';
import { Service } from './services/entities/service.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'taller-db',
      entities: [Salon, Service, Appointment],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [SalonsModule, AppointmentsModule, ServicesModule],
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    SalonsModule,
    ServicesModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
