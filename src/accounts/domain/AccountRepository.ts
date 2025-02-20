import { Account } from "./Account";

export abstract class AccountRepository {
  abstract findMany(): Promise<Account[]> | null;
  abstract create(data: Account): Promise<Account> | null;
}