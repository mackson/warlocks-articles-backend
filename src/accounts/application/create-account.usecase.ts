import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountRepository } from '../domain/account.repository';
import { Account } from '../domain/account';
import { Role } from './roles/role.enum';
import { AccountDto } from '../domain/dto/account.dto';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    @Inject('AccountRepository') private accountRepository: AccountRepository,
  ) { }

  async execute(data: Partial<Account>): Promise<String> {

    console.log(data);
    
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
      roles: data.roles || [Role.Author],
      avatar: data.avatar || '',
      password: hashedPassword,
      status: 1,
    });

    const savedAccount = await this.accountRepository.create(account);

    if (!savedAccount) {
    throw new Error('Account not created');
    }
  
    return 'Account created';

  }
  
}