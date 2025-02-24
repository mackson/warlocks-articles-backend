import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '../domain/account.repository';
import { AccountEntity } from '../domain/account.entity';

@Injectable()
export class GetProfileUseCase {
  constructor(
    @Inject('AccountRepository') private accountRepository: AccountRepository,
  ) { }

  async execute(id: string): Promise<AccountEntity> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  }
}