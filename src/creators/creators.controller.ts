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
import { CreatorsService } from './creators.service';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Post()
  create(@Body() createCreator: object) {
    return this.creatorsService.create(createCreator);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    try {
      return this.creatorsService.findOne(name);
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
}
