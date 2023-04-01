import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(4, 40)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
