import { Router } from 'express';
import { PapersController } from './papers.controller';
import { fetchByPubmedSchema, listPapersSchema } from './papers.schema';
import { authMiddleware, validate, trackApiUsage, uploadMiddleware } from '../../middleware';

const router = Router();

// Apply auth and usage tracking to all papers routes
router.use(authMiddleware as any);
router.use(trackApiUsage);

router.post('/pubmed', validate(fetchByPubmedSchema), PapersController.fetchByPubmedId);
router.post('/upload', uploadMiddleware, PapersController.uploadPDF);
router.get('/', validate(listPapersSchema), PapersController.listPapers);
router.get('/:id', PapersController.getPaperById);
router.delete('/:id', PapersController.deletePaper);

export default router;
