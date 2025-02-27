import { Module } from '@nestjs/common';
import { CreateAccountUseCase } from 'src/accounts/application/create-account.usecase';
import { AccountMongooseRepository } from 'src/accounts/infra/repositories/account-mongoose.repository';
import { GetAllAccountsUseCase } from '../application/get-all-accounts.usecase';
import { AccountController } from './http/account.controller';
import { AuthUseCase } from '../application/auth.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './schemas/account.schema';
import { UpdateAccountUseCase } from '../application/update-account.usecase';
import { CreateProfileUseCase } from '../application/create-profile.usecase';
import { UpdateProfileUseCase } from '../application/update-profile.usecase';
import { GetProfileUseCase } from '../application/get-profile.usecase';
import { AccountSeeder } from './seeders/account.seeder';

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
    CreateProfileUseCase,
    UpdateAccountUseCase,
    UpdateProfileUseCase,
    GetAllAccountsUseCase,
    GetProfileUseCase,
    AuthUseCase,
    AccountSeeder,
  ],
  exports: [
    'AccountRepository',
    CreateAccountUseCase,
    CreateProfileUseCase,
    UpdateAccountUseCase,
    UpdateProfileUseCase,
    GetAllAccountsUseCase,
    GetProfileUseCase,
    AuthUseCase,
    AccountSeeder,
  ],
  
})
export class InfraModule {}
