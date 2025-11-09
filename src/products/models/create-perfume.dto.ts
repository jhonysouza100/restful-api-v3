import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class CreatePerfumeDto extends CreateProductDto {
  @ApiProperty({ description: 'Tamaño del perfume', example: '100ml', maxLength: 50, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  size?: string;

  @ApiProperty({ description: 'Concentración del perfume', example: 'EDP', maxLength: 50, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  concentration?: string;
}