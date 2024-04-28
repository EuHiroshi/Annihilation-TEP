import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { Utils } from 'src/utils/utils';
import { InjectModel } from '@nestjs/mongoose';
import { Comics } from './schemas/comic.schemas';
import { Model } from 'mongoose';

@Injectable()
export class ComicsService implements OnModuleInit {
  constructor(@InjectModel(Comics.name) private comicsModel: Model<Comics>) {}

  async onModuleInit() {
    const url = new Utils().createUrlFetch('comics');
    const data = await fetch(url);
    const json = await data.json();

    const comicsData = json.data.results.map((data) => {
      const comics = {
        id: data.id,
        title: data.title,
        characters: data.characters.items,
        creators: data.creators.items,
        thumbnail: data.thumbnail.path,
      };

      return comics;
    });

    this.insertMany(comicsData);
  }

  async create(createComicDto: CreateComicDto) {
    this.comicsModel.create(createComicDto);
  }

  async insertMany(createComics: [object]) {
    this.comicsModel.insertMany(createComics);
  }

  async findAll() {
    const findedComics = await this.comicsModel.find();
    return findedComics;
  }

  async findOne(id: string) {
    const findedComic = await this.comicsModel.findOne({
      id: id,
    });
    return findedComic;
  }

  async getCharacters(id: string) {
    const comic = await this.findOne(id);

    return comic.characters;
  }

  async getUrlImg(id: string) {
    const comic = await this.findOne(id);
    const url = `${comic.thumbnail}/standard_amazing.jpg`;

    return url;
  }

  async update(id: string, updateComicDto: UpdateComicDto) {
    const updatedComic = await this.comicsModel.updateOne(
      { id: id },
      updateComicDto,
    );
    return updatedComic;
  }

  async delete(id: string) {
    await this.comicsModel.findOneAndDelete({ id: id });
  }
}
