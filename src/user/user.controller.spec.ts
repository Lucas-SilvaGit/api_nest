import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { userServiceMock } from "../testing/user-service.mock";
import { AuthGuard } from "../guards/auth.guard";
import { guardMock } from "../testing/guard.mock";
import { RoleGuard } from "../guards/role.guard";
import { UserService } from "./user.service";
import { createUserDTO } from "../testing/create-user-dto.mock";
import { userEntityList } from "../testing/user-entity-list.mock";
import { updatePutUserDTO } from "../testing/update-put-user-dto.mock";
import { updatePatchUserDTO } from "../testing/update-patch-user-dto.mock copy";

describe('UserController', () => {

  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock]
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('Validate the definition', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();

  });

  describe('Create', () => {
    it('create method', async () => {
      const result = await userController.create(createUserDTO);

      expect(result).toEqual(userEntityList[0])
    });
  })

  describe('Read', () => {
    it('list method', async () => {
      const result = await userController.list();

      expect(result).toEqual(userEntityList);
    });

    it('show method', async () => {
      const result = await userController.readOne(1);

      expect(result).toEqual(userEntityList[0])
    });
  })

  describe('Update', () => {
    it('update method', async () => {
      const result = await userController.update(updatePutUserDTO, 1);

      expect(result).toEqual(userEntityList[0]);
    });

    it('update partial method', async () => {
      const result = await userController.updatePartial(updatePatchUserDTO, 1);

      expect(result).toEqual(userEntityList[0])
    });
  })

  describe('Delete', () => {
    it('delete method', async () => {
      const result = await userController.delete(1);

      expect(result).toEqual({ success: true });
    });
  })

  describe('Teste da aplicação dos Guards neste controle', () => {
    it('se os guards estao aplicados', async () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]).toBeInstanceOf(AuthGuard);
      expect(new guards[1]).toBeInstanceOf(RoleGuard);
    });
  })
})