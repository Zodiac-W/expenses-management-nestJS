import { IsNotEmpty, Length } from 'class-validator';

export class CreateSpaceDto {
  @IsNotEmpty()
  @Length(4, 30)
  name: string;
}
