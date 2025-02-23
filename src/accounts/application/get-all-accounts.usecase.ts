import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '../domain/account.repository';
import { AccountDto } from '../domain/dto/account.dto';

@Injectable()
export class GetAllAccountsUseCase {
  constructor(
    @Inject('AccountRepository') private accountRepository: AccountRepository,
  ) { }

  async execute(): Promise<AccountDto[]> {
    const accounts = await this.accountRepository.findAll();
    return accounts;
  }
}