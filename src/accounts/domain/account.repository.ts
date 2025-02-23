import { Account } from "./account";
import { AccountDto } from "./dto/account.dto";

export interface AccountRepository {
  create(account: Account): Promise<String>;
  findAll(): Promise<AccountDto[]>;
  findById(id: string): Promise<Account | null>;
  update(id: string, account: Account): Promise<String>;
  findByEmail(email: string): Promise<Account | null>;
}