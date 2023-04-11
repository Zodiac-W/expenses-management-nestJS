import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
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
  @ApiProperty({
    example: 'John Doe',
    description: 'The user name',
    type: String,
  })
  @IsNotEmpty()
  @Length(4, 40)
  user_name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The user email',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  user_email: string;

  @ApiProperty({
    example: '123456789',
    description: 'The user phone number',
    type: String,
  })
  @IsNotEmpty()
  @IsNumber()
  user_phone: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'The user password',
    type: String,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  user_pass: string;

  @ApiProperty({
    example: UserRole.SUPER_USER,
    enum: UserRole,
    description: 'The user role',
  })
  @IsEnum(UserRole)
  user_role: UserRole;

  @ApiProperty({
    example: '2023-12-31',
    description: 'The user expiration date',
    type: Date,
  })
  @IsOptional()
  @IsDate()
  user_expiration: Date;

  @ApiProperty({
    example: 10,
    description: 'The number of total transactions for a user',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  user_total_transactions: number;

  @ApiProperty({
    example: true,
    description: 'Whether or not the user is active',
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  user_is_active: boolean;

  @ApiProperty({
    example: 5,
    description: 'The number of spaces the user can create',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  user_spaces: number;
}
