import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0/annihilation'), CharactersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
