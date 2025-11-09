import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PerfumesService } from '../services/perfumes.service';
import { CreatePerfumeDto } from '../models/create-perfume.dto';
import { UpdatePerfumeDto } from '../models/update-perfume.dto';
import { PerfumeEntity } from '../entities/perfume.entity';

@ApiTags('Perfumes')
@Controller('products/perfumes')
export class PerfumesController {
  constructor(private readonly perfumesService: PerfumesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new perfume' })
  @ApiResponse({ status: 201, description: 'Perfume created successfully', type: PerfumeEntity })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createPerfumeDto: CreatePerfumeDto): Promise<PerfumeEntity> {
    return await this.perfumesService.create(createPerfumeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all perfumes' })
  @ApiResponse({ status: 200, description: 'List of all perfumes', type: [PerfumeEntity] })
  async findAll(): Promise<PerfumeEntity[]> {
    return await this.perfumesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a perfume by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Perfume ID' })
  @ApiResponse({ status: 200, description: 'Perfume found', type: PerfumeEntity })
  @ApiResponse({ status: 404, description: 'Perfume not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PerfumeEntity> {
    return await this.perfumesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a perfume' })
  @ApiParam({ name: 'id', type: 'number', description: 'Perfume ID' })
  @ApiResponse({ status: 200, description: 'Perfume updated successfully', type: PerfumeEntity })
  @ApiResponse({ status: 404, description: 'Perfume not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePerfumeDto: UpdatePerfumeDto,
  ): Promise<PerfumeEntity> {
    return await this.perfumesService.update(id, updatePerfumeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a perfume' })
  @ApiParam({ name: 'id', type: 'number', description: 'Perfume ID' })
  @ApiResponse({ status: 204, description: 'Perfume deleted successfully' })
  @ApiResponse({ status: 404, description: 'Perfume not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.perfumesService.remove(id);
  }
}

