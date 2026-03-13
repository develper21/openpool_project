import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '', {
  maxRetriesPerRequest: 1,
  connectTimeout: 5000,
  lazyConnect: true,
  retryStrategy: (times) => {
    if (times > 2) return null; // Stop retrying after 2 attempts
    return Math.min(times * 500, 2000);
  },
});

// Suppress unhandled errors (connection issues should not crash the app)
redis.on('error', (err) => {
  console.warn('[Redis] Connection error (non-fatal):', err.message);
});

export default redis;
