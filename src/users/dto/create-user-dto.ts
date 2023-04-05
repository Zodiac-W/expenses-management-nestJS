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
  user_name: string;

  @IsNotEmpty()
  @IsEmail()
  user_email: string;

  @IsNotEmpty()
  @IsNumber()
  user_phone: string;

  @IsNotEmpty()
  @IsStrongPassword()
  user_pass: string;
}
