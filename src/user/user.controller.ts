import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';

// @UseInterceptors(LogInterceptor)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  [x: string]: any;
  constructor(private readonly userService: UserService) {}

  @Roles(Role.User)
  @Get()
  async list() {
    return this.userService.list();
  }

  @Roles(Role.User)
  @Get(':id')
  async readOne(@ParamId() id: number) {
    return this.userService.show(id);
  }

  @Roles(Role.User)
  @Post()
  async create(@Body() { name, email, password, birthday }: CreateUserDTO) {
    return this.userService.create({
      name,
      email,
      password,
      birthday,
      role: 1,
    });
  }

  @Roles(Role.User)
  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    return this.userService.update(id, data);
  }

  @Roles(Role.User)
  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    return this.userService.updatePartial(id, data);
  }

  @Roles(Role.User)
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return {
      success: await this.userService.delete(id),
    };
  }
}
