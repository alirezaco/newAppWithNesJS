import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/model/user.repository';
import { SignUpUserDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(user: SignUpUserDto) {
    await this.userRepository.createUser(user);
    return { message: 'success' };
  }
}
