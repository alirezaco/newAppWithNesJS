import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/model/user.repository';
import { SignUpUserDto } from './dto/signUp.dto';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(user: SignUpUserDto) {
    await this.userRepository.createUser(user);
    return { message: 'success' };
  }

  async getAll() {
    return { message: 'success', data: await this.userRepository.find() };
  }

  async getOne(username: string) {
    const user = await this.userRepository.findOne({ username });
    if (!user) throw new NotFoundException(`User with ${username} not found`);
    return { message: 'success', data: user };
  }

  async deleteOne(username: string) {
    const user = await this.getOne(username);
    await this.userRepository.delete(user.data.id);
    return {
      message: 'success',
    };
  }

  async update(username: string, userDto: UpdateUserDto) {
    await this.getOne(username);
    return {
      message: 'success',
      data: await this.userRepository.updateUser(username, userDto),
    };
  }
}
