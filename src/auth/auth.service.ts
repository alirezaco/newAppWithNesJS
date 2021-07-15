import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/model/user.repository';
import { SingInUserDto } from './dto/signIn.dto';
import { SignUpUserDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(user: SignUpUserDto) {
    await this.userRepository.createUser(user);
    return { message: 'success' };
  }

  async signIn(userDto: SingInUserDto) {
    return this.userRepository.signInUser(userDto);
  }
}
