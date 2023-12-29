import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { userRepositoryMock } from "../testing/user-repository.mock";
import { userEntityList } from "../testing/user-entity-list.mock";
import { createUserDTO } from "../testing/create-user-dto.mock";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { updatePutUserDTO } from "../testing/update-put-user-dto.mock";
import { updatePatchUserDTO } from "../testing/update-patch-user-dto.mock copy";

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        userRepositoryMock
      ]
    }).compile();
    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity))
  });

  it('Validate the definition', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();

  });

  describe('Create', () => {
    it('should create', async () => {

      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);
      const result = await userService.create(createUserDTO);

      expect(result).toEqual(userEntityList[0])
    });
  });

  describe('Read', () => {
    it('should read list', async () => {

      const result = await userService.list();

      expect(result).toEqual(userEntityList);
    });

    it('should read show', async () => {

      const result = await userService.show(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    it('should update', async () => {

      const result = await userService.update(1, updatePutUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });

    it('should updatePartial', async () => {

      const result = await userService.updatePartial(1, updatePatchUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    it('should delete', async () => {

      const result = await userService.delete(1);

      expect(result).toEqual(true);
    });
  });
})