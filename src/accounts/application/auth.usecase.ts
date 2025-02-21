import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository } from '../domain/account.repository';
import { Account } from '../domain/account';

type LoginResponse = {
  token: string;
  email: string;
  name: string;
  id: string;
  avatar: string;
};

@Injectable()
export class AuthUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string): Promise<{ userData: LoginResponse }> {
 
    const account = await this.accountRepository.findByEmail(email);
    if (!account) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: account.id, email: account.email };
    const token = this.jwtService.sign(payload);

    return { userData: { token: token, email: account.email, name: account.name, id: account.id, avatar: account.avatar } };
  }

  async logout(accountId: string): Promise<void> {
    //logout logic 
  }

  async checkToken(token: string): Promise<boolean> {
    //check token logic
    return true;
  }
}