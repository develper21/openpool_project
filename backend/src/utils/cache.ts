import NodeCache from 'node-cache';

class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({
      stdTTL: 3600, // 1 hour
      checkperiod: 600,
    });
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  set<T>(key: string, value: T, ttl?: number): void {
    if (ttl) {
      this.cache.set(key, value, ttl);
    } else {
      this.cache.set(key, value);
    }
  }

  del(key: string): void {
    this.cache.del(key);
  }

  flush(): void {
    this.cache.flushAll();
  }

  generateSummaryKey(paperId: string, role: string): string {
    return `summary:${paperId}:${role}`;
  }

  generatePubmedKey(pmid: string): string {
    return `pubmed:${pmid}`;
  }
}

export const cache = new CacheService();
