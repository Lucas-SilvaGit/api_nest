import { IsString, IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDTO {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 0,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0
  })
  password: string;
}