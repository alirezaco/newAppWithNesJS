/* eslint-disable prettier/prettier */
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @MaxLength(40)
  @MinLength(2)
  username: string;

  @IsString()
  @MaxLength(40)
  @MinLength(8)
  @Matches(/^(?=(.*[a-z | A-Z]){1,})(?=(.*[\d]){1,})(?!.*\s).{8,}/gm, {
    message: 'password pattern incorrect',
  })
  password: string;

  @IsString()
  @MinLength(2)
  fullName: string;
}
