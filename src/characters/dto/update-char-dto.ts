import { IsArray, IsString } from 'class-validator';

export class UpdateChardto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  comics: [object];

  @IsArray()
  series: [object];

  @IsArray()
  stories: [object];

  @IsString()
  thumbnail: string;
}
