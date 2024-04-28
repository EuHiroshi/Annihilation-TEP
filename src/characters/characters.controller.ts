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
import { CharactersService } from './characters.service';
import { UpdateChardto } from './dto/update-char-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Characters')
@Controller('character')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um personagem' })
  create(@Body() createCharacter: object) {
    return this.charactersService.create(createCharacter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontrar um personagem, com base no id' })
  findOne(@Param('id') id: string) {
    try {
      return this.charactersService.findOne(id);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Encontrar todos os personagens' })
  findAll() {
    return this.charactersService.findAll();
  }

  @Get('/:id/comics')
  @ApiOperation({
    summary: 'Encontrar os quadrinhos que o personagem aparece, com base no id',
  })
  getComics(@Param('id') id: string) {
    try {
      return this.charactersService.getComics(id);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/:id/img')
  @ApiOperation({ summary: 'Encontrar a imagem do personagem, com base no id' })
  getImgUrl(@Param('id') id: string) {
    try {
      return this.charactersService.getUrlImg(id);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um personagem, com base no id' })
  update(@Param('id') id: string, @Body() updateCharDto: UpdateChardto) {
    const updatedChar = this.charactersService.update(id, updateCharDto);
    return updatedChar;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um personagem, com base no id' })
  delete(@Param('id') id: string) {
    return this.charactersService.delete(id);
  }
}
