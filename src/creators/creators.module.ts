import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatorsService } from './creators.service';
import { CreatorsController } from './creators.controller';
import { Creators, CreatorsSchema } from './schemas/creator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Creators.name, schema: CreatorsSchema },
    ]),
  ],
  providers: [CreatorsService],
  exports: [CreatorsService],
  controllers: [CreatorsController],
})
export class CreatorsModule {}
