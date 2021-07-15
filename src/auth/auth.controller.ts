import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInUserDto } from './dto/signIn.dto';
import { SignUpUserDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body(ValidationPipe) user: SignUpUserDto) {
    return this.authService.signUp(user);
  }

  @Post('/signIn')
  async signIn(@Body(ValidationPipe) user: SingInUserDto) {
    return this.authService.signIn(user);
  }
}
