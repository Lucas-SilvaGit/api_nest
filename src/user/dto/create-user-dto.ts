import { IsString, IsEmail, IsStrongPassword, IsOptional, IsDateString, IsEnum } from "class-validator";
import { Role } from "src/enums/role.enum";

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

  @IsOptional()
  @IsEnum(Role)
  role: number;
}