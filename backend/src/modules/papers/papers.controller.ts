import { Request, Response, NextFunction } from 'express';
import { PapersService } from './papers.service';
import { AppError } from '../../middleware/error';

export class PapersController {
  static async fetchByPubmedId(req: Request, res: Response, next: NextFunction) {
    try {
      const { pubmedId } = req.body;
      const userId = (req as any).user.id;
      
      const paper = await PapersService.createPaperFromPubmed(pubmedId, userId);
      
      res.status(201).json({
        success: true,
        data: paper,
      });
    } catch (error) {
      next(error);
    }
  }

  static async uploadPDF(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new AppError('No PDF file uploaded', 400);
      }

      const userId = (req as any).user.id;
      const paper = await PapersService.createPaperFromPDF(req.file.path, userId);

      res.status(201).json({
        success: true,
        data: paper,
      });
    } catch (error) {
      next(error);
    }
  }

  static async listPapers(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, search, sourceType } = req.query;
      const result = await PapersService.listPapers({
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 10,
        search: search as string,
        sourceType: sourceType as any,
      });

      
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPaperById(req: Request, res: Response, next: NextFunction) {
    try {
      const paper = await PapersService.getPaperById(req.params.id as string);

      
      res.status(200).json({
        success: true,
        data: paper,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePaper(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { id: userId, role: userRole } = (req as any).user;
      
      await PapersService.deletePaper(id as string, userId, userRole);

      
      res.status(200).json({
        success: true,
        message: 'Paper deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
