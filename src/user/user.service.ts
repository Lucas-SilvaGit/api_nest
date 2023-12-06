import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create({ email, name, password }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        email,
        name,
        password
      }
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, { name, email, password, birthday }: UpdatePutUserDTO) {
    return this.prisma.user.update({
      data: { name, email, password, birthday: birthday ? new Date(birthday) : null },
      where: {
        id
      }
    });
  }

  async updatePartial(id: number, { name, email, password, birthday }: UpdatePatchUserDTO) {
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

    return this.prisma.user.update({
      data,
      where: {
        id
      }
    });
  }
}