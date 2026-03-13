import winston from 'winston';
import { env } from '../config/env';

const { combine, timestamp, json, printf, colorize } = winston.format;

// Custom format for local development
const customDevFormat = printf((info: any) => {
  const { level, message, timestamp, stack } = info;
  return `${timestamp} ${level}: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    env.NODE_ENV === 'production' ? json() : customDevFormat
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      format: json()
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      format: json()
    }),
  ],
});

// If not in production, log to console with colors
if (env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customDevFormat
      ),
    })
  );
}

export default logger;
