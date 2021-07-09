import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpUserDto } from './dto/signUp.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() userDto: SignUpUserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get('/:username')
  async getOne(@Param('username') username: string) {
    return this.userService.getOne(username);
  }

  @Delete('/:username')
  async deleteOne(@Param('username') username: string) {
    return this.userService.deleteOne(username);
  }

  @Put('/:username')
  @UsePipes(ValidationPipe)
  update(@Param('username') username: string, @Body() userDto: UpdateUserDto) {
    return this.userService.update(username, userDto);
  }
}
