import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { SingleEmail } from '../validation/single-email.validator';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail(undefined, { message: 'The email is invalid' })
  @SingleEmail({ message: 'User with this email already exists' })
  email: string;

  @MinLength(6)
  password: string;
}
