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
  ) { }

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
    const createdChar = this.charactersModel.create(createCharacter);
    return createdChar;
  }

  async insertMany(createCharacter: [object]) {
    this.charactersModel.insertMany(createCharacter);
  }

  async findAll() {
    const findedCharacters = await this.charactersModel.find();
    return findedCharacters;
  }

  async findOne(id: string){
    const findedCharacters = await this.charactersModel.findOne({
      id: id,
    });
    return findedCharacters;
  }

  async getComics(id: string) {
    const character = await this.findOne(id);
    return character.comics
  }

  async getUrlImg(id: string) {
    const character = await this.findOne(id);
    const url = `${character.thumbnail}/standard_amazing.jpg`;

    return url;
  }

  async update(id: string, updateCharDto: UpdateChardto) {
    const updatedCharacters = await this.charactersModel.findOneAndUpdate(
      { id: id },
      updateCharDto,
      { new: true }
    );
    return updatedCharacters;
  }

  async delete(id: string) {
    await this.charactersModel.findOneAndDelete({ id: id });
  }
}
