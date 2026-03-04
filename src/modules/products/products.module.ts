import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from 'src/core/core.module';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { ProductsController } from 'src/modules/products/products.controller';
import { ProductsService } from 'src/modules/products/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CoreModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
