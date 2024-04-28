import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ComicsDocument = HydratedDocument<Comics>;

@Schema({ timestamps: true })
export class Comics {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  characters: [object];

  @Prop({ required: true })
  creators: [object];

  @Prop({ required: true })
  thumbnail: string;
}

export const ComicsSchema = SchemaFactory.createForClass(Comics);
