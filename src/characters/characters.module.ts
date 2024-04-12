import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Characters, CharactersSchema } from './schemas/character.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Characters.name, schema: CharactersSchema },
    ]),
  ],
  providers: [CharactersService],
  exports: [CharactersService],
  controllers: [CharactersController],
})
export class CharactersModule {}
