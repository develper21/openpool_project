"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.connectDatabase = connectDatabase;
const client_1 = require("@prisma/client");
const env_1 = require("./env");
const globalForPrisma = global;
exports.prisma = globalForPrisma.prisma ||
    new client_1.PrismaClient({
        log: env_1.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
if (env_1.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
async function connectDatabase() {
    try {
        await exports.prisma.$connect();
        console.log('Successfully connected to the database');
    }
    catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
}
exports.default = exports.prisma;
