import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountRepository } from '../domain/account.repository';
import { Account } from '../domain/account';
import { AccountDto } from '../domain/dto/account.dto';

@Injectable()
export class UpdateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
  ) { }

  async execute(accountId: string, data: Partial<Account>, confirmPassword?: string): Promise<String> {
    const existingAccount = await this.accountRepository.findById(accountId);
    if (!existingAccount) {
      throw new ConflictException('Account not found');
    }

    if (data.email && data.email !== existingAccount.email) {
      const emailInUse = await this.accountRepository.findByEmail(data.email);
      if (emailInUse) {
        throw new ConflictException('Email already in use');
      }
    }

    let hashedPassword = existingAccount.password;
    if (data.password) {
      if (!confirmPassword) {
        throw new BadRequestException('Password confirmation is required');
      }
      if (data.password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    const account = new Account({
      id: accountId,
      name: data.name || existingAccount.name,
      email: data.email || existingAccount.email,
      bio: data.bio || existingAccount.bio,
      roles: data.roles || existingAccount.roles,
      avatar: data.avatar || existingAccount.avatar,
      password: hashedPassword,
      status: data.status || existingAccount.status,
    });

    const updatedAccount = await this.accountRepository.update(accountId, account);

    if (!updatedAccount) {
      throw new Error('Account not updated');
    }
  
    return 'Account updated';
  }
  
}