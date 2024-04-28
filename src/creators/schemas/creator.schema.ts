import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreatorsDocument = HydratedDocument<Creators>;

@Schema({ timestamps: true })
export class Creators {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  comics: [object];

  @Prop({ required: true })
  series: [object];

  @Prop({ required: true })
  stories: [object];

  @Prop({ required: true })
  thumbnail: string;
}

export const CreatorsSchema = SchemaFactory.createForClass(Creators);
