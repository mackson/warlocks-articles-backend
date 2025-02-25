import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository } from '../domain/account.repository';

type AccountProfile = {
  token: string;
  email: string;
  name: string;
  id: string;
  avatar: string;
  roles: string[];
};

@Injectable()
export class AuthUseCase {
  constructor(
    @Inject('AccountRepository') private accountRepository: AccountRepository,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string): Promise<{ account: AccountProfile }> {
 
    const account = await this.accountRepository.findByEmail(email);
    if (!account) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: account.id, email: account.email, roles: account.roles };
    const token = this.jwtService.sign(payload);

    return {
      account: {
        token: token, 
        email: account.email,
        roles: account.roles, 
        name: account.name, 
        id: account.id, 
        avatar: account.avatar
      } 
    };
  }

}