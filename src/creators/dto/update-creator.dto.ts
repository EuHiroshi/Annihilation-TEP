import { IsArray, IsString } from 'class-validator';

export class UpdateCreatorDto {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  fullName: string;

  @IsArray()
  comics: [object];

  @IsArray()
  series: [object];

  @IsArray()
  stories: [object];

  @IsString()
  thumbnail: string;
}
