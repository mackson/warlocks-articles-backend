import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountRepository } from '../domain/account.repository';
import { Account } from '../domain/account';

@Injectable()
export class UpdateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
  ) { }

  async execute(accountId: string, data: Partial<Account>, confirmPassword?: string): Promise<Account> {
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

    const updatedAccount = new Account({
      id: accountId,
      name: data.name || existingAccount.name,
      email: data.email || existingAccount.email,
      bio: data.bio || existingAccount.bio,
      group: data.group || existingAccount.group,
      avatar: data.avatar || existingAccount.avatar,
      password: hashedPassword,
      status: data.status || existingAccount.status,
      createdAt: existingAccount.createdAt,
      updatedAt: new Date(),
    });

    return await this.accountRepository.update(accountId, updatedAccount);
  }
  
}