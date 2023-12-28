import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { userRepositoryMock } from "../testing/user-repository.mock";

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        userRepositoryMock
      ]
    }).compile();
    userService = module.get<UserService>(UserService);
  });

  it('Validate the definition', () => {
    expect(userService).toBeDefined();

  })
})