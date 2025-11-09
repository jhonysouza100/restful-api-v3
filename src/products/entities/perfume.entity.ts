import { ChildEntity, Column, Entity } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('perfumes')
export class PerfumeEntity extends ProductEntity {
  @Column({ type: 'varchar', length: 50, nullable: true })
  size: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  concentration: string;
}