import { CountriesEntity } from './countries.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesResolver } from './countries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CountriesEntity])],
  providers: [CountriesResolver, CountriesService],
})
export class CountriesModule {}
