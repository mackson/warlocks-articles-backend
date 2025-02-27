import { AccountEntity } from "./account.entity";
import { AccountDto } from "./dto/account.dto";

export interface AccountRepository {
  create(account: AccountEntity): Promise<String>;
  findAll(): Promise<AccountDto[]>;
  findById(id: string): Promise<AccountEntity | null>;
  findProfile(id: string): Promise<AccountDto | null>;
  update(id: string, account: AccountEntity): Promise<String>;
  findByEmail(email: string): Promise<AccountEntity | null>;
}