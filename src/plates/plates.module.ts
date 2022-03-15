import { PlatesEntity } from './plates.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PlatesService } from './plates.service';
import { PlatesResolver } from './plates.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PlatesEntity])],
  providers: [PlatesResolver, PlatesService]
})
export class PlatesModule {}
