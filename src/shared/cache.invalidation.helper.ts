import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheInvalidationHelper {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async clearCache(): Promise<void> {
    if ('keys' in this.cacheManager) {
      const keys = await (this.cacheManager as any).keys();
      await Promise.all(keys.map((key: string) => this.cacheManager.del(key)));
    }
  }
}
