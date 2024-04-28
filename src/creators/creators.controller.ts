import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  create(@Body() createCreator: object) {
    return this.creatorsService.create(createCreator);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.creatorsService.findOne(id);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/:id/comics')
  findComics(@Param('id') id: string) {
    try {
      return this.creatorsService.getComicsByCreators(id);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  findAll() {
    return this.creatorsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreatorDto: UpdateCreatorDto) {
    const updatedCreator = this.creatorsService.update(id, updateCreatorDto);
    return updatedCreator;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.creatorsService.delete(id);
  }
}
