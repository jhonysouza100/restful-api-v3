import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsInt, Min, MaxLength, IsBoolean, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCategory } from 'src/modules/products/enums/products.enum';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Producto ejemplo', maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @ApiProperty({ description: 'Descripción del producto', example: 'Descripción del producto', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Precio del producto', example: 89.99, minimum: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({ description: 'Descuento del producto (porcentaje)', example: 10.5, minimum: 0, maximum: 100, required: false, default: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  discount?: number;

  @ApiProperty({ description: 'Cantidad en stock', example: 50, minimum: 0 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @ApiProperty({ description: 'Marca del producto', example: 'Marca ejemplo', maxLength: 100, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  brand?: string;

  @ApiProperty({ description: 'Modelo del producto', example: 'Modelo ejemplo', maxLength: 100, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  model?: string;

  @ApiProperty({ description: 'Categoría del producto', enum: ProductCategory, example: ProductCategory.UNKNOWN, required: false })
  @IsEnum(ProductCategory)
  @IsOptional()
  category?: ProductCategory;

  @ApiProperty({ description: 'Indica si el producto es nuevo', example: true, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isNew?: boolean;

  @ApiProperty({ description: 'Indica si el producto es popular', example: true, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isPopular?: boolean;
}