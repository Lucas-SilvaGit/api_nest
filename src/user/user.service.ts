import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data,
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    await this.exists(id);

    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, { name, email, password, birthday, role }: UpdatePutUserDTO) {
    await this.exists(id);

    return this.prisma.user.update({
      data: { name, email, password, birthday: birthday ? new Date(birthday) : null, role },
      where: {
        id
      }
    });
  }

  async updatePartial(id: number, { name, email, password, birthday, role }: UpdatePatchUserDTO) {
    await this.exists(id);

    const data: any = {};

    if (birthday) {
      data.birthday = new Date(birthday);
    }

    if (email) {
      data.email = email;
    }


    if (name) {
      data.name = name;
    }


    if (password) {
      data.password = password;
    }

    if (role) {
      data.role = role;
    }

    return this.prisma.user.update({
      data,
      where: {
        id
      }
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id
      }
    });
  }

  async exists(id: number) {
    if (!(await this.prisma.user.count({
      where: {
        id
      }
    }))) {
      throw new NotFoundException(`O usuario ${id} não foi encontrado!!!`);
    }
  }
}