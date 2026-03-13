import { PrismaClient, Role, SourceType, SummaryStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const INDIAN_NAMES = [
  "Dr. Rajesh Kumar", "Dr. Anjali Desai", "Dr. Vikram Singh", "Dr. Priya Patel",
  "Dr. Amit Gupta", "Dr. Sunita Sharma", "Dr. Ramesh Verma", "Dr. Neha Iyer",
  "Dr. Sanjay Kapoor", "Dr. Kavita Reddy", "Dr. Arvind Swaminathan", "Dr. Suresh Pillai",
  "Dr. Meera Nambiar", "Dr. Aditya Joshi", "Dr. Pooja Agarwal"
];

const TOPICS = [
  "CRISPR-Cas9", "Machine Learning", "Ayurvedic Formulations", "Genomic Sequencing",
  "Vitamin D Deficiency", "Telemedicine", "Type 2 Diabetes", "Cardiovascular Disease",
  "Nanotechnology", "Stem Cell Therapy", "Blockchain in Healthcare", "Artificial Intelligence",
  "Robotic Surgery", "Gut Microbiome", "Neuroplasticity"
];

const CONTEXTS = [
  "in South Asian Populations", "in Urban Indian Women", "for Early Detection",
  "in Managing Rheumatoid Arthritis", "Strains in India", ": A Systematic Review",
  "during the COVID-19 Pandemic", "in Rural Healthcare", "among Pediatric Patients",
  ": A Meta-Analysis", "in Elderly Populations", "and its Clinical Implications"
];

const FINDINGS = [
  "Significant improvement observed in the intervention group.",
  "Results varied geographically with higher efficacy in urban centers.",
  "The model achieved 94.5% accuracy in early stage prediction.",
  "Reported minimal adverse effects compared to standard treatments.",
  "Long-term analysis indicates sustained therapeutic benefits.",
  "Disparity identified in access to specialized care.",
  "Gene expression profiles were significantly altered.",
  "Biomarker XYZ proved to be a reliable early indicator."
];

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomElements(arr: string[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  console.log('Cleaning up existing data...');
  await prisma.feedback.deleteMany();
  await prisma.summary.deleteMany();
  await prisma.paper.deleteMany();
  await prisma.apiKey.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('admin123', salt);
  const researcherPasswordHash = await bcrypt.hash('password123', salt);

  console.log('Creating Admin Account...');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@distill.com',
      passwordHash,
      name: 'Admin Sharma',
      role: Role.ADMIN,
      apiCallsCount: randomInt(1500, 5000),
      apiCallsLimit: 50000,
    },
  });

  console.log('Creating Researchers...');
  const users = [admin];
  for (let i = 0; i < INDIAN_NAMES.length; i++) {
    const nameStr = INDIAN_NAMES[i];
    const emailStr = nameStr.toLowerCase().replace(/[^a-z]/g, '') + `@example.com`;
    const user = await prisma.user.create({
      data: {
        email: emailStr,
        passwordHash: researcherPasswordHash,
        name: nameStr,
        role: Role.RESEARCHER,
        apiCallsCount: randomInt(50, 1000),
        apiCallsLimit: 10000,
      },
    });
    users.push(user);
    
    // Create an API key for 50% of users
    if (Math.random() > 0.5) {
      await prisma.apiKey.create({
        data: {
          name: `${nameStr.split(' ')[1]}'s Mac Key`,
          key: `distill_sk_live_${Math.random().toString(36).substring(2, 15)}`,
          maskedKey: `distill_••••••••${Math.random().toString(36).substring(2, 6)}`,
          tier: i % 3 === 0 ? "PRO" : "BASIC",
          usage: randomInt(50, 2000),
          limit: i % 3 === 0 ? 10000 : 1000,
          userId: user.id,
          lastUsedAt: new Date()
        }
      });
    }
  }

  // Also manually create a specific key for the admin
  await prisma.apiKey.create({
    data: {
      name: `Admin Production Key`,
      key: `distill_sk_live_admin${Math.random().toString(36).substring(2, 11)}`,
      maskedKey: `distill_••••••••admin`,
      tier: "ADMIN",
      usage: randomInt(5000, 25000),
      limit: 50000,
      userId: admin.id,
      lastUsedAt: new Date()
    }
  });

  console.log('Creating Papers, Summaries, and Feedback...');
  
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  // Generate ~80 papers & summaries
  for (let i = 0; i < 80; i++) {
    const topic = TOPICS[randomInt(0, TOPICS.length - 1)];
    const context = CONTEXTS[randomInt(0, CONTEXTS.length - 1)];
    const title = `${topic} ${context}`;
    const authors = getRandomElements(INDIAN_NAMES, randomInt(1, 4)).map(n => n.replace("Dr. ", ""));
    const createdDate = randomDate(twoWeeksAgo, now);
    
    const paper = await prisma.paper.create({
      data: {
        title,
        authors,
        abstract: `This study focuses on ${title}. We analyzed a broad cohort and derived extensive conclusions highlighting the importance of targeted methodologies in modern science.`,
        journal: i % 3 === 0 ? 'Indian Journal of Medical Research' : (i % 2 === 0 ? 'Nature India' : 'The Lancet Global Health'),
        publishedDate: `202${randomInt(2, 6)}-0${randomInt(1, 9)}-15`,
        sourceType: i % 4 === 0 ? SourceType.PDF : SourceType.PUBMED,
        pubmedId: i % 4 === 0 ? null : `3${randomInt(5000000, 9999999)}`,
      }
    });

    // Pick a random user to own the summary
    const user = users[randomInt(1, users.length - 1)]; // Favor researchers
    const statusOpts = [SummaryStatus.COMPLETED, SummaryStatus.COMPLETED, SummaryStatus.COMPLETED, SummaryStatus.PROCESSING, SummaryStatus.FAILED];
    const status = statusOpts[randomInt(0, statusOpts.length - 1)];

    const summary = await prisma.summary.create({
      data: {
        paperId: paper.id,
        userId: user.id,
        status,
        createdAt: createdDate,
        keyFindings: status === SummaryStatus.COMPLETED ? getRandomElements(FINDINGS, 3) : [],
        methodology: status === SummaryStatus.COMPLETED ? ["Retrospective single-center study", "Statistical analysis using SPSS v25"] : [],
        conclusions: status === SummaryStatus.COMPLETED ? ["The findings strongly suggest re-evaluating current guidelines based on regional demographic constraints."] : [],
        backgroundContext: "Background context extracted successfully outlining historical perspective.",
        limitations: status === SummaryStatus.COMPLETED ? ["Small sample size in specific subgroups", "Lack of diverse geolocations in the dataset"] : [],
        futureDirections: status === SummaryStatus.COMPLETED ? ["Larger multi-center randomized control trials are required."] : [],
        tags: [topic.split(" ")[0] || "General", "Research"],
        model: i % 2 === 0 ? 'gemini-1.5-pro' : 'gemini-1.5-flash',
        processingTimeMs: randomInt(2000, 15000),
        tokenCount: randomInt(1500, 8000),
        errorMessage: status === SummaryStatus.FAILED ? "Failed to parse PDF contents properly." : null,
      }
    });

    // 60% chance to leave feedback if it was completed
    if (status === SummaryStatus.COMPLETED && Math.random() > 0.4) {
      const overall = randomInt(1, 5);
      const comments = [
        "Absolutely brilliant abstraction.", // 5
        "Good enough, but missed some nuance in the discussion.", // 4
        "Met my expectations.", // 3
        "Missed out on the methodology tables.", // 2
        "Failed to extract the right authors and key points were completely misinterpreted." // 1
      ];
      
      let comment: string | null = comments[5 - overall]; // Roughly match sentiment
      if (Math.random() > 0.5) comment = null; // Sometimes no comment

      await prisma.feedback.create({
        data: {
          summaryId: summary.id,
          userId: user.id,
          overallRating: overall,
          accuracyRating: overall >= 4 ? randomInt(4, 5) : randomInt(1, 3),
          coherenceRating: overall >= 4 ? randomInt(4, 5) : randomInt(1, 3),
          comment,
          createdAt: new Date(createdDate.getTime() + randomInt(1, 48) * 60 * 60 * 1000) // Hours later
        }
      });
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
