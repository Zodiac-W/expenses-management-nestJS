import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

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

  @IsEnum(UserRole)
  user_role: UserRole;

  @IsOptional()
  @IsDate()
  user_expiration: Date;

  @IsOptional()
  @IsNumber()
  user_total_transactions;

  @IsOptional()
  @IsNumber()
  user_spaces: number;
}
