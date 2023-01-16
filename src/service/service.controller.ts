import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Service } from './entities/service.entity';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiOperation({summary: 'Serviece qoshish'})
  @ApiResponse({status: 201, type: Service})
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @ApiOperation({summary: 'Serviecelar royxati'})
  @ApiResponse({status: 201, type: [Service]})
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @ApiOperation({summary: 'Serviece id boyicha bittassi'})
  @ApiResponse({status: 201, type: Service})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @ApiOperation({summary: 'Serviece ozgartirish'})
  @ApiResponse({status: 201, type: Service})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @ApiOperation({summary: 'Serviece ochirish'})
  @ApiResponse({status: 201, type: Service})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
