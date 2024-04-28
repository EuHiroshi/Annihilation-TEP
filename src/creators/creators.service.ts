import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Utils } from 'src/utils/utils';
import { Creators } from './schemas/creator.schema';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Injectable()
export class CreatorsService implements OnModuleInit {
  constructor(
    @InjectModel(Creators.name) private creatorsModel: Model<Creators>,
  ) {}

  async onModuleInit() {
    const url = new Utils().createUrlFetch('creators');
    const data = await fetch(url);
    const json = await data.json();

    const creatorsData = json.data.results.map((data) => {
      const creator = {
        id: data.id,
        firstName: data.firstName,
        fullName: data.fullName,
        comics: data.comics.items,
        series: data.series.items,
        stories: data.stories.items,
        thumbnail: data.thumbnail.path,
      };

      return creator;
    });

    this.insertMany(creatorsData);
  }

  async create(createCreator: object) {
    this.creatorsModel.create(createCreator);
  }

  async insertMany(createCreator: [object]) {
    this.creatorsModel.insertMany(createCreator);
  }

  async findOne(id: string) {
    const findedCreators = await this.creatorsModel.findOne({
      id: id,
    });
    return findedCreators;
  }

  async findAll() {
    const findedCreators = await this.creatorsModel.find();
    return findedCreators;
  }

  async update(id: string, updateCreatorDto: UpdateCreatorDto) {
    const updatedCreator = await this.creatorsModel.updateOne(
      { id: id },
      updateCreatorDto,
    );
    return updatedCreator;
  }

  delete(id: string) {
    this.creatorsModel.deleteOne({ id: id });
  }
}
