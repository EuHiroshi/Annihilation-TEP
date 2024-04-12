import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { charactersService } from './characters.service';

@Controller('character')
export class CharactersController {
  constructor(private readonly charactersService: CharactersController) {}

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
}
