import fs from 'fs';
import { prisma } from '../../config/database';
import { fetchPubMedPaper, validatePMID } from '../../utils/pubmed';
import { extractTextFromPDF, extractTitleFromPDF } from '../../utils/pdf';
import { AppError } from '../../middleware/error';
import { ListPapersQuery } from './papers.schema';

export class PapersService {
  static async createPaperFromPubmed(pubmedId: string, userId: string) {
    if (!validatePMID(pubmedId)) {
      throw new AppError('Invalid PubMed ID format', 400);
    }

    // Check if exists
    const existing = await prisma.paper.findUnique({
      where: { pubmedId },
    });

    if (existing) {
      return existing;
    }

    const pubmedData = await fetchPubMedPaper(pubmedId);

    const paper = await prisma.paper.create({
      data: {
        pubmedId,
        title: pubmedData.title,
        abstract: pubmedData.abstract,
        authors: pubmedData.authors,
        journal: pubmedData.journal,
        publishedDate: pubmedData.publishedDate,
        doi: pubmedData.doi,
        sourceType: 'PUBMED',
      },
    });

    return paper;
  }

  static async createPaperFromPDF(filePath: string, userId: string) {
    const { text, pageCount, truncated } = await extractTextFromPDF(filePath);
    const title = extractTitleFromPDF(text) || 'Untitled PDF';

    const paper = await prisma.paper.create({
      data: {
        title,
        fullText: text,
        abstract: text.substring(0, 500),
        sourceType: 'PDF',
        pdfPath: filePath,
      },
    });

    return paper;
  }

  static async listPapers(query: ListPapersQuery) {
    const { page = 1, limit = 10, search, sourceType } = query;
    const skip = (page - 1) * limit;
    const take = Math.min(limit, 50);

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { abstract: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (sourceType) {
      where.sourceType = sourceType;
    }

    const [papers, total] = await Promise.all([
      prisma.paper.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { summaries: true },
          },
        },
      }),
      prisma.paper.count({ where }),
    ]);

    return {
      papers,
      total,
      page,
      limit: take,
    };
  }

  static async getPaperById(id: string) {
    const paper = await prisma.paper.findUnique({
      where: { id },
      include: {
        _count: {
          select: { summaries: true },
        },
      },
    });

    if (!paper) {
      throw new AppError('Paper not found', 404);
    }

    return paper;
  }

  static async deletePaper(id: string, userId: string, userRole: string) {
    const paper = await prisma.paper.findUnique({
      where: { id },
    });

    if (!paper) {
      throw new AppError('Paper not found', 404);
    }

    if (userRole !== 'ADMIN') {
      throw new AppError('Only administrators can delete papers', 403);
    }

    // Delete PDF file if exists
    if (paper.pdfPath && fs.existsSync(paper.pdfPath)) {
      try {
        fs.unlinkSync(paper.pdfPath);
      } catch (err) {
        console.error(`Failed to delete file: ${paper.pdfPath}`, err);
      }
    }

    await prisma.paper.delete({
      where: { id },
    });
  }
}
