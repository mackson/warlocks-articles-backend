import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { ArticlesModule } from './articles/articles.module';
import { ConfigModule } from '@nestjs/config';

import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheableMemory } from 'cacheable';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Module({
  imports: [
    AccountsModule, 
    ArticlesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 600000, lruSize: 5000 }),
            }),
            createKeyv('redis://redis:6379'),
          ],
        };
      },
    }),
  ],
  providers: [
    {
      provide: CACHE_MANAGER,
      useFactory: () => {},
    }
  ],
  exports: [CACHE_MANAGER],
})
export class AppModule {}
