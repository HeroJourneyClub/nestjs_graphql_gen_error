import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Availability } from './availability.entity';
import { AvailabilityResolver } from './availability.resolver';

const models = [SequelizeModule.forFeature([Availability])];

@Module({
  imports: [...models],
  providers: [AvailabilityResolver],
  exports: [...models],
})
export class AvailabilityModule {}
