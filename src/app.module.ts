import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [AccountsModule, ArticlesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
