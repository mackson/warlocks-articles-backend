import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../domain/account.repository';
import { Account } from '../domain/account';

@Injectable()
export class GetAllAccountsUseCase {
  constructor(
    private accountRepository: AccountRepository,
  ) { }

  async execute(): Promise<Account[]> {
    const accounts = await this.accountRepository.findMany();
    return accounts;
  }
}