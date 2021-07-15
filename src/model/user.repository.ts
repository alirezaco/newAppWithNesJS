/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { SignUpUserDto } from 'src/user/dto/signUp.dto';
import { UpdateUserDto } from 'src/user/dto/update.dto';
import { User } from './user.entity';
import { ConflictException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SingInUserDto } from 'src/auth/dto/signIn.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userDto: SignUpUserDto) {
    const { username, password, fullName } = userDto;

    if (await this.findOne({ username }))
      throw new ConflictException(`user with ${username} exist`);

    const user = new User();

    const salt = await bcrypt.genSalt();
    user.username = username;
    user.password = await this.hashingPassword(password, salt);
    user.fullName = fullName;

    await user.save();
  }

  async updateUser(oldUsername: string, userDto: UpdateUserDto) {
    const { username, password, fullName, age } = userDto;

    const user = await this.findOne({ username: oldUsername });

    user.username = username;
    user.password = password;
    user.fullName = fullName;
    user.age = age | 0;

    return user.save();
  }

  async signInUser(userDto: SingInUserDto) {
    const { username, password } = userDto;

    const user = await this.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) return user;
    else throw new BadRequestException();
  }

  private hashingPassword(password, salt) {
    return bcrypt.hash(password, salt);
  }
}
