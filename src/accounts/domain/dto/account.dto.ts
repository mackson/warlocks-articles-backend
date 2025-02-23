import { Role } from '../../application/roles/role.enum';

export type AccountDto = {
  id: string;
  name: string;
  email: string;
  bio: string;
  roles: Role[];
  status: number;
  avatar: string;
}

