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
import { ObjectId } from 'mongoose';
import { UpdateChardto } from './dto/update-char-dto';

@Controller('character')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacter: object) {
    return this.charactersService.create(createCharacter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.charactersService.findOne(id);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }
 
  @Get('/:id/comics')
  getComics(@Param('id') id: string) {
    try {
      return this.charactersService.getComics(id);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/:id/img')
  getImgUrl(@Param('id') id: string) {
    try {
      return this.charactersService.getUrlImg(id);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharDto: UpdateChardto) {
    const updatedChar = this.charactersService.update(id, updateCharDto);
    return updatedChar;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.charactersService.delete(id);
  }
}
