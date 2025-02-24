import { Module } from '@nestjs/common';
import { CreateAccountUseCase } from 'src/accounts/application/create-account.usecase';
import { AccountMongooseRepository } from 'src/accounts/infra/repositories/account-mongoose.repository';
import { GetAllAccountsUseCase } from '../application/get-all-accounts.usecase';
import { AuthUseCase } from '../application/auth.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './schemas/article.schema';
import { UpdateAccountUseCase } from '../application/update-account.usecase';
import { CreateProfileUseCase } from '../application/create-profile.usecase';
import { UpdateProfileUseCase } from '../application/update-profile.usecase';
import { GetProfileUseCase } from '../application/get-profile.usecase';
import { ArticleController } from './http/article.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [ArticleController],
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
  ],
  
})
export class InfraModule {}
