import { Injectable } from '@nestjs/common';
import { Characters } from './schemas/character.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Characters.name) private charactersModel: Model<Characters>,
  ) {}

  async create(createCharacter: object) {
    this.charactersModel.create(createCharacter);
  }

  findOne(name: string) {
    const findedCharacters = this.charactersModel.findOne({
      name: name,
    });
    return findedCharacters;
  }

  findAll() {
    const findedCharacters = this.charactersModel.find();
    return findedCharacters;
  }
}
