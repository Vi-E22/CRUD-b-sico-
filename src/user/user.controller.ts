import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';
import { UserListDTO } from './dto/UserList.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;
    userEntity.id = uuid();

    this.userRepository.save(userEntity);
    return {
      user: new UserListDTO(userEntity.id, userEntity.name),
      message: 'User created successfully',
    };
  }

  @Get()
  async listUsers() {
    const savedUsers = await this.userRepository.list();
    const usersList = savedUsers.map(
      (user) => new UserListDTO(user.id, user.name),
    );

    return usersList;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, newData);

    return {
      user: updatedUser,
      message: 'User updated sucessfully',
    };
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.userRepository.remove(id);

    return {
      user: removedUser,
      message: 'User removed sucessfully',
    };
  }
}
