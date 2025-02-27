// src/seeder/seeder.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Account, AccountDocument } from 'src/accounts/infra/schemas/account.schema';

@Injectable()
export class AccountSeeder implements OnModuleInit {
  private readonly logger = new Logger(AccountSeeder.name);
  constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}

  async onModuleInit(): Promise<void> {
    await this.seedAdminAccount();
  }

  async seedAdminAccount(): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';
    const adminExists = await this.accountModel.findOne({ email: adminEmail });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const newAdmin = new this.accountModel({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        roles: ['admin'],
        bio: "Admin account",
        avatar: "https://fakeimg.pl/600x400?text=Admin",
        status: 1
      });
      await newAdmin.save();
      this.logger.log('Admin account created successfully');
    } else {
      this.logger.log('Admin account already exists');
    }
  }
}
