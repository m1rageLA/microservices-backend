import { IsNotEmpty, IsString } from 'class-validator';

export class LogoDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
