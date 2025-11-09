import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerfumeEntity } from '../entities/perfume.entity';
import { CreatePerfumeDto } from '../models/create-perfume.dto';
import { UpdatePerfumeDto } from '../models/update-perfume.dto';

@Injectable()
export class PerfumesService {
  constructor(
    @InjectRepository(PerfumeEntity)
    private readonly perfumeRepository: Repository<PerfumeEntity>,
  ) {}

  async create(createPerfumeDto: CreatePerfumeDto): Promise<PerfumeEntity> {
    const perfume = this.perfumeRepository.create(createPerfumeDto);
    return await this.perfumeRepository.save(perfume);
  }

  async findAll(): Promise<PerfumeEntity[]> {
    return await this.perfumeRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<PerfumeEntity> {
    const perfume = await this.perfumeRepository.findOne({ where: { id } });
    if (!perfume) {
      throw new NotFoundException(`Perfume with ID ${id} not found`);
    }
    return perfume;
  }

  async update(id: number, updatePerfumeDto: UpdatePerfumeDto): Promise<PerfumeEntity> {
    const perfume = await this.findOne(id);
    Object.assign(perfume, updatePerfumeDto);
    return await this.perfumeRepository.save(perfume);
  }

  async remove(id: number): Promise<void> {
    const perfume = await this.findOne(id);
    await this.perfumeRepository.remove(perfume);
  }
}

