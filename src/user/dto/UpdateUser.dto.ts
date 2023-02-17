import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { SingleEmail } from '../validation/single-email.validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'The email is invalid' })
  @SingleEmail({ message: 'User with this email already exists' })
  @IsOptional()
  email: string;

  @MinLength(6)
  @IsOptional()
  password: string;
}
