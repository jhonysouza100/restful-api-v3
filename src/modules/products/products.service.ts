import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantContextService } from 'src/core/services/tenant-context.service';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/products/dto/update-product.dto';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { Like, MoreThanOrEqual, Repository } from 'typeorm';
import { envs } from 'src/common/config';
import { th } from 'zod/v4/locales';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly tenantContextService: TenantContextService,
  ) {}

  private getTenantId(): number {
    return this.tenantContextService.getTenantId();
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepository.create({
      ...createProductDto,
      tenantId: this.getTenantId(),
    });
    return await this.productRepository.save(product);
  }

  async findAll(query?: Record<string, string>): Promise<{ products: ProductEntity[]; count: number }> {
    const ITEMS_PER_PAGE = envs.ITEMS_PER_PAGE; // Numero de items por pagina, se puede configurar en el archivo .env
    // Desestructuramos los parámetros de la query
    const { page, status, stock, ...filters } = query;
    // Se asegura de que `page` tenga un valor por defecto de 1
    const pageNumber = parseInt(page) > 0 ? parseInt(page) : 1;

    try {
      // Si no se proporcionan filtros adicionales, se devuelve la paginación básica
      if(!query) {
        const [products, count] = await this.productRepository.findAndCount({
          skip: (pageNumber - 1) * ITEMS_PER_PAGE,
          take: ITEMS_PER_PAGE,
        })
        if(products.length === 0) {
          throw new NotFoundException('No products found');
        }
        return { products, count };
      }

      // Construimos las condiciones de búsqueda dinámicamente a partir de los parámetros de la query
      const whereConditions = filters
        ? Object.entries(filters).reduce((acc, [key, value]) => {
            acc[key] = Like(`%${value}%`); // Búsqueda por valor parcial;
            return acc;
          }, {} as Record<string, any>)
        : {};
      
      // Agregar condición exacta para el status si se pasó
      if (status !== undefined) {
        whereConditions['status'] = status === 'true';
        whereConditions['stock'] = MoreThanOrEqual(1);
      }

      // Realizamos la búsqueda con las condiciones dinámicas
      const [products, count] = await this.productRepository.findAndCount({
        where: { ...whereConditions, tenantId: this.getTenantId() },
        skip: ITEMS_PER_PAGE * (pageNumber - 1), // Paginación
        take: ITEMS_PER_PAGE, // Limitamos los resultados por página
        order: { createdAt: 'DESC' }, // Ordenamos por fecha de creación descendente
      });

      if (products.length === 0) {
        throw new NotFoundException('No products found with the given criteria');
      }

      return { products, count };
    } catch (error) {
      throw new NotFoundException('Error to fetch products');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  // Este metodo se va usar internamente dentro del "servicio" para buscar productos por id
  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id, tenantId: this.getTenantId() },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}