"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PapersService = void 0;
const fs_1 = __importDefault(require("fs"));
const database_1 = require("../../config/database");
const pubmed_1 = require("../../utils/pubmed");
const pdf_1 = require("../../utils/pdf");
const error_1 = require("../../middleware/error");
class PapersService {
    static async createPaperFromPubmed(pubmedId, userId) {
        if (!(0, pubmed_1.validatePMID)(pubmedId)) {
            throw new error_1.AppError('Invalid PubMed ID format', 400);
        }
        // Check if exists
        const existing = await database_1.prisma.paper.findUnique({
            where: { pubmedId },
        });
        if (existing) {
            return existing;
        }
        const pubmedData = await (0, pubmed_1.fetchPubMedPaper)(pubmedId);
        const paper = await database_1.prisma.paper.create({
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
    static async createPaperFromPDF(filePath, userId) {
        const { text, pageCount, truncated } = await (0, pdf_1.extractTextFromPDF)(filePath);
        const title = (0, pdf_1.extractTitleFromPDF)(text) || 'Untitled PDF';
        const paper = await database_1.prisma.paper.create({
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
    static async listPapers(query) {
        const { page = 1, limit = 10, search, sourceType } = query;
        const skip = (page - 1) * limit;
        const take = Math.min(limit, 50);
        const where = {};
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
            database_1.prisma.paper.findMany({
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
            database_1.prisma.paper.count({ where }),
        ]);
        return {
            papers,
            total,
            page,
            limit: take,
        };
    }
    static async getPaperById(id) {
        const paper = await database_1.prisma.paper.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { summaries: true },
                },
            },
        });
        if (!paper) {
            throw new error_1.AppError('Paper not found', 404);
        }
        return paper;
    }
    static async deletePaper(id, userId, userRole) {
        const paper = await database_1.prisma.paper.findUnique({
            where: { id },
        });
        if (!paper) {
            throw new error_1.AppError('Paper not found', 404);
        }
        if (userRole !== 'ADMIN') {
            throw new error_1.AppError('Only administrators can delete papers', 403);
        }
        // Delete PDF file if exists
        if (paper.pdfPath && fs_1.default.existsSync(paper.pdfPath)) {
            try {
                fs_1.default.unlinkSync(paper.pdfPath);
            }
            catch (err) {
                console.error(`Failed to delete file: ${paper.pdfPath}`, err);
            }
        }
        await database_1.prisma.paper.delete({
            where: { id },
        });
    }
}
exports.PapersService = PapersService;
