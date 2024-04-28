import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';
import { ComicsModule } from './comics/comics.module';
import { CreatorsModule } from './creators/creators.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0/annihilation'),
    CharactersModule,
    ComicsModule,
    CreatorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
