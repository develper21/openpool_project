import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@distill.ai' },
    update: {},
    create: {
      email: 'admin@distill.ai',
      name: 'System Admin',
      passwordHash: passwordHash,
      role: Role.ADMIN,
      apiKey: 'sk_admin_test_key_123',
    },
  });

  // 2. Create Researcher Users
  const researcher1 = await prisma.user.upsert({
    where: { email: 'jane.smith@pharma.com' },
    update: {},
    create: {
      email: 'jane.smith@pharma.com',
      name: 'Dr. Jane Smith',
      passwordHash: passwordHash,
      role: Role.RESEARCHER,
      apiKey: 'sk_researcher_jane_456',
    },
  });

  const researcher2 = await prisma.user.upsert({
    where: { email: 'john.doe@university.edu' },
    update: {},
    create: {
      email: 'john.doe@university.edu',
      name: 'John Doe',
      passwordHash: passwordHash,
      role: Role.RESEARCHER,
      apiKey: 'sk_researcher_john_789',
    },
  });

  // 3. Create initial API Keys for testing
  await prisma.apiKey.createMany({
    data: [
      {
        name: 'Production Server',
        key: 'distill_prod_8x9f1234z0pq',
        maskedKey: 'distill_••••••••z0pq',
        tier: 'RESEARCHER',
        userId: researcher1.id,
        limit: 10000,
      },
      {
        name: 'Local Dev',
        key: 'distill_dev_45678x9f1234',
        maskedKey: 'distill_••••••••1234',
        tier: 'BASIC',
        userId: researcher2.id,
        limit: 1000,
      }
    ],
    skipDuplicates: true,
  });

  console.log('Seeding completed:');
  console.log('- 1 Admin created (admin@distill.ai)');
  console.log('- 2 Researchers created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
