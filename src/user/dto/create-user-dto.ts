import { IsString, IsEmail, IsStrongPassword, IsOptional, IsDateString } from "class-validator";

export class CreateUserDTO {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsDateString()
  birthday: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 0,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0
  })
  password: string;
}