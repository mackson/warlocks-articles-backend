import { Role } from '../application/roles/role.enum';

interface AccountProps {
  id: string;
  name: string;
  email: string;
  bio: string;
  password: string;
  roles: Role[];
  status: number;
  avatar: string;
}

export class Account {

  id: string;

  name: string;

  email: string;

  bio: string;

  password: string;

  roles: Role[];

  status: number;

  avatar: string;

  constructor(props: AccountProps){
    Object.assign(this, props);
  }
}