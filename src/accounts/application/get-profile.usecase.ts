import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountRepository } from '../domain/account.repository';
import { AccountDto } from '../domain/dto/account.dto';

@Injectable()
export class GetProfileUseCase {
  constructor(
    @Inject('AccountRepository') private accountRepository: AccountRepository,
  ) { }

  async execute(id: string, userId:string): Promise<AccountDto> {
    const account = await this.accountRepository.findProfile(id);
    if (!account) {
      throw new ConflictException('Account not found');
    }
    
    if (account.id !== userId) {
      throw new UnauthorizedException('You do not have permission to view this profile');
    }
    
    return account;
  }
}