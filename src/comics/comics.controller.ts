import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComicsService } from './comics.service';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comics')
@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um quadrinho' })
  create(@Body() createComicDto: CreateComicDto) {
    return this.comicsService.create(createComicDto);
  }

  @Get()
  @ApiOperation({ summary: 'Encontrar todos os quadrinhos' })
  findAll() {
    return this.comicsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontrar um quadrinho pelo seu id' })
  findOne(@Param('id') id: string) {
    return this.comicsService.findOne(id);
  }

  @Get('/:id/characters')
  @ApiOperation({
    summary:
      'Mostrar todos os personagens que aparecem em um quadrinho, com base no id',
  })
  getCharacters(@Param('id') id: string) {
    return this.comicsService.getCharacters(id);
  }

  @Get('/:id/img')
  @ApiOperation({
    summary: 'Mostrar a imagem de um quadrinho, com base no id',
  })
  getImgUrl(@Param('id') id: string) {
    return this.comicsService.getUrlImg(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um quadrinho já existente, com base no id',
  })
  update(@Param('id') id: string, @Body() updateComicDto: UpdateComicDto) {
    return this.comicsService.update(id, updateComicDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um quadrinho, com base no id' })
  delete(@Param('id') id: string) {
    return this.comicsService.delete(id);
  }
}
