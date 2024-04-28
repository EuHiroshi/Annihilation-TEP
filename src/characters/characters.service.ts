import { Injectable, OnModuleInit } from '@nestjs/common';
import { Characters } from './schemas/character.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Utils } from 'src/utils/utils';
import { UpdateChardto } from './dto/update-char-dto';

@Injectable()
export class CharactersService implements OnModuleInit {
  constructor(
    @InjectModel(Characters.name) private charactersModel: Model<Characters>,
  ) {}

  async onModuleInit() {
    const url = new Utils().createUrlFetch('characters');
    const data = await fetch(url);
    const json = await data.json();

    const charactersData = json.data.results.map((data) => {
      const character = {
        id: data.id,
        name: data.name,
        description: data.description,
        comics: data.comics.items,
        series: data.series.items,
        stories: data.stories.items,
        thumbnail: data.thumbnail.path,
      };

      return character;
    });

    this.insertMany(charactersData);
  }

  async create(createCharacter: object) {
    this.charactersModel.create(createCharacter);
  }

  async insertMany(createCharacter: [object]) {
    this.charactersModel.insertMany(createCharacter);
  }

  async findOne(id: string) {
    const findedCharacters = await this.charactersModel.findOne({
      id: id,
    });
    return findedCharacters;
  }

  async findAll() {
    const findedCharacters = await this.charactersModel.find();
    return findedCharacters;
  }

  async update(id: string, updateCharDto: UpdateChardto) {
    const updatedCharacters = await this.charactersModel.updateOne(
      { id: id },
      updateCharDto,
    );
    return updatedCharacters;
  }

  delete(id: string) {
    this.charactersModel.deleteOne({ id: id });
  }
}
