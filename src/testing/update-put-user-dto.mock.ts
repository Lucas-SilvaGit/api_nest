import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';
import { Role } from '../enums/role.enum';

export const updatePutUserDTO: UpdatePutUserDTO = {
  name: 'John',
  email: 'john@example.com',
  password: '123456',
  birthday: '1994-11-05',
  role: Role.User,
};
