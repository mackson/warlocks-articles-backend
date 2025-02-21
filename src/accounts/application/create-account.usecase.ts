import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountRepository } from '../domain/account.repository';
import { Account } from '../domain/account';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
  ) { }

  async execute(data: Partial<Account>): Promise<Account> {
    
    if (!data.email) {
      throw new ConflictException('Email is required');
    }

    const existingAccount = await this.accountRepository.findByEmail(data.email);
    if (existingAccount) {
      throw new ConflictException('Email already in use');
    }

    if (!data.password) {
      throw new ConflictException('Password is required');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const account = new Account({
      id: '',
      name: data.name || '',
      email: data.email,
      bio: data.bio || '',
      group: data.group || 'Author',
      avatar: data.avatar || '',
      password: hashedPassword,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.accountRepository.create(account);
  }
  
}