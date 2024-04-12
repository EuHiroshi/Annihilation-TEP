import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharactersDocument = HydratedDocument<Characters>;

@Schema({ timestamps: true })
export class Characters {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  comics: object[];

  @Prop({ required: true })
  series: object[];

  @Prop({ required: true })
  stories: object[];

  @Prop({ required: true })
  thumbnail: string;
}

export const CharactersSchema = SchemaFactory.createForClass(Characters);
