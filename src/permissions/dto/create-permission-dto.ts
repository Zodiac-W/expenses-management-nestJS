import { IsNotEmpty, Length } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @Length(4, 50)
  name: string;

  @Length(4, 200)
  description: string;
}
