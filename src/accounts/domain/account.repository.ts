import { Account } from "./account";

export interface AccountRepository {
  create(data: Account): Promise<Account>;
  findMany(): Promise<Account[]>;
  findById(id: string): Promise<Account>;
  update(id: string, data: Account): Promise<Account>;
  login(email: string, password: string): Promise<String>;
  findByEmail(email: string): Promise<Account>;
}