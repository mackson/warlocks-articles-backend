import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountRepository } from '../domain/account.repository';
import { AccountEntity } from '../domain/account.entity';
import { Role } from './roles/role.enum';

@Injectable()
export class CreateProfileUseCase {
  constructor(
    @Inject('AccountRepository') private accountRepository: AccountRepository,
  ) { }

  async execute(data: Partial<AccountEntity>): Promise<String> {

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

    const account = new AccountEntity({
      id: '',
      name: data.name || '',
      email: data.email,
      bio: data.bio || '',
      roles: [Role.Author],
      avatar: data.avatar || '',
      password: hashedPassword,
      status: 1,
    });

    const savedAccount = await this.accountRepository.create(account);

    if (!savedAccount) {
      throw new ConflictException('Account not created');
    }
  
    return 'Account created';

  }
  
}