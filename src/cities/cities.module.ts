import { CitiesEntity } from './cities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesResolver } from './cities.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity])],
  providers: [CitiesResolver, CitiesService],
})
export class CitiesModule {}
