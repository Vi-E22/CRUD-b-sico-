import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class SingleEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const emaiExistslWithUser = await this.userRepository.emailExists(value);
    return !emaiExistslWithUser;
  }
}

export const SingleEmail = (validationOptions: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: SingleEmailValidator,
    });
  };
};
