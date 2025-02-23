import { Account } from "src/accounts/domain/account";
import { AccountDocument } from "../../schemas/account.schema";
import { AccountDto } from "src/accounts/domain/dto/account.dto";

export class AccountMapper {

  static returnAccount(account: AccountDocument) : AccountDto {
    return {
      id: (account._id as string).toString(),
      name: account.name,
      email: account.email,
      bio: account.bio,
      roles: account.roles,
      avatar: account.avatar,
      status: account.status,
    };
  }

  static returnAllAccountData(account: AccountDocument) : Account {
    return new Account({
      id: (account._id as string).toString(),
      name: account.name,
      email: account.email,
      bio: account.bio,
      roles: account.roles,
      avatar: account.avatar,
      password: account.password,
      status: account.status,
    });
  }
}