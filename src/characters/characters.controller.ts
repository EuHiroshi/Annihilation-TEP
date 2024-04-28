import {
  Body,
  Controller,
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

  @Get(':name')
  findOne(@Param('name') name: string) {
    try {
      return this.charactersService.findOne(name);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharDto: UpdateChardto) {
    const updatedChar = this.charactersService.update(id, updateCharDto);
    return updatedChar;
  }
}
