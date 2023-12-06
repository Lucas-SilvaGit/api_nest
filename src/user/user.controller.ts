import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async list() {
    return { users: [] }
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id }
  }

  @Post()
  async create(@Body() { name, email, password }: CreateUserDTO) {
    return this.userService.create({ name, email, password });
  }

  @Put(':id')
  async update(@Body() body: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
    return {
      method: 'PUT',
      body,
      id
    }
  }

  @Patch(':id')
  async updatePartial(@Body() body: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
    return {
      method: 'PATCH',
      body,
      id
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id }
  }
}