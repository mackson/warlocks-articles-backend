import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountEntity } from '../../domain/account.entity';
import { AccountRepository } from 'src/accounts/domain/account.repository';
import { AccountDocument } from '../schemas/account.schema';
import { AccountDto } from 'src/accounts/domain/dto/account.dto';
import { AccountMapper } from './mapper/account.mapper';

@Injectable()
export class AccountMongooseRepository implements AccountRepository {
  constructor(
    @InjectModel('Account') private accountModel: Model<AccountDocument>,
  ) {}

  async create(account: AccountEntity): Promise<String> {
    const newAccount = new this.accountModel({
      name: account.name,
      email: account.email,
      bio: account.bio,
      roles: account.roles,
      avatar: account.avatar,
      password: account.password,
      status: account.status,
    });

    const savedAccount = await newAccount.save();
    if (!savedAccount) {
      throw new Error('Account not created');
    }
    return 'Account created';
  }

  async findAll(): Promise<AccountDto[]> {
    const accounts = await this.accountModel.find().exec();
    return accounts.map(account => AccountMapper.returnAccount(account));
  }

  async findById(id: string): Promise<AccountEntity | null> {
    const account = await this.accountModel.findById(id).exec();
    return account ? AccountMapper.returnAllAccountData(account) : null;
  }

  async update(id: string, data: AccountEntity): Promise<String> {
    const updatedAccount = await this.accountModel.findByIdAndUpdate(
      id,
      {
        name: data.name,
        email: data.email,
        bio: data.bio,
        roles: data.roles,
        avatar: data.avatar,
        password: data.password,
        status: data.status,
      },
      { new: true }
    ).exec();

    if (!updatedAccount) {
      throw new Error('Account not updated');
    }

    return 'Account updated';
  }

  async findByEmail(email: string): Promise<AccountEntity | null> {
    const account = await this.accountModel.findOne({ email }).exec();
    return account ? AccountMapper.returnAllAccountData(account) : null;
  }
}
