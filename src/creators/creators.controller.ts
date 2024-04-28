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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Creators')
@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um criador de quadrinhos' })
  create(@Body() createCreator: object) {
    return this.creatorsService.create(createCreator);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Encontrar um criador de quadrinhos, com base no id',
  })
  findOne(@Param('id') id: string) {
    try {
      return this.creatorsService.findOne(id);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/:id/comics')
  @ApiOperation({
    summary: 'Encontrar todos os quadrinhos, com base no id do criador',
  })
  findComics(@Param('id') id: string) {
    try {
      return this.creatorsService.getComicsByCreators(id);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Encontrar todos criadores de quadrinhos' })
  findAll() {
    return this.creatorsService.findAll();
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um criador de quadrinhos, com base no id',
  })
  update(@Param('id') id: string, @Body() updateCreatorDto: UpdateCreatorDto) {
    const updatedCreator = this.creatorsService.update(id, updateCreatorDto);
    return updatedCreator;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um criador de quadrinhos' })
  delete(@Param('id') id: string) {
    this.creatorsService.delete(id);
  }
}
