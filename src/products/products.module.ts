import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfumesController } from './controllers/perfumes.controller';
import { PerfumesService } from './services/perfumes.service';
import { ProductEntity } from './entities/product.entity';
import { PerfumeEntity } from './entities/perfume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerfumeEntity])],
  controllers: [PerfumesController],
  providers: [PerfumesService]
})
export class ProductsModule {}