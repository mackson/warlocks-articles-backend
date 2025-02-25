import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AccountsModule } from './accounts/accounts.module';
import { ArticlesModule } from './articles/articles.module';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    AccountsModule, 
    ArticlesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      ttl: 60 * 5,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
