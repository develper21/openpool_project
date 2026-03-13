"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PapersController = void 0;
const papers_service_1 = require("./papers.service");
const error_1 = require("../../middleware/error");
class PapersController {
    static async fetchByPubmedId(req, res, next) {
        try {
            const { pubmedId } = req.body;
            const userId = req.user.id;
            const paper = await papers_service_1.PapersService.createPaperFromPubmed(pubmedId, userId);
            res.status(201).json({
                success: true,
                data: paper,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async uploadPDF(req, res, next) {
        try {
            if (!req.file) {
                throw new error_1.AppError('No PDF file uploaded', 400);
            }
            const userId = req.user.id;
            const paper = await papers_service_1.PapersService.createPaperFromPDF(req.file.path, userId);
            res.status(201).json({
                success: true,
                data: paper,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async listPapers(req, res, next) {
        try {
            const { page, limit, search, sourceType } = req.query;
            const result = await papers_service_1.PapersService.listPapers({
                page: page ? parseInt(page, 10) : 1,
                limit: limit ? parseInt(limit, 10) : 10,
                search: search,
                sourceType: sourceType,
            });
            res.status(200).json({
                success: true,
                ...result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getPaperById(req, res, next) {
        try {
            const paper = await papers_service_1.PapersService.getPaperById(req.params.id);
            res.status(200).json({
                success: true,
                data: paper,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async deletePaper(req, res, next) {
        try {
            const { id } = req.params;
            const { id: userId, role: userRole } = req.user;
            await papers_service_1.PapersService.deletePaper(id, userId, userRole);
            res.status(200).json({
                success: true,
                message: 'Paper deleted successfully',
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PapersController = PapersController;
