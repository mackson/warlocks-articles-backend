import { Module } from '@nestjs/common';
import { CreateAccountUseCase } from 'src/accounts/application/create-account.usecase';
import { AccountMongooseRepository } from 'src/accounts/infra/repositories/account-mongoose.repository';
import { GetAllAccountsUseCase } from '../application/get-all-accounts.usecase';
import { AccountController } from './http/account.controller';
import { AuthUseCase } from '../application/auth.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [
    {
      provide: 'AccountRepository',
      useClass: AccountMongooseRepository,
    },
    CreateAccountUseCase,
    GetAllAccountsUseCase,
    AuthUseCase
  ],
  exports: [
    'AccountRepository',
    CreateAccountUseCase,
    GetAllAccountsUseCase,
    AuthUseCase,
  ],
  
})
export class InfraModule {}
