"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const papers_controller_1 = require("./papers.controller");
const papers_schema_1 = require("./papers.schema");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
// Apply auth and usage tracking to all papers routes
router.use(middleware_1.authMiddleware);
router.use(middleware_1.trackApiUsage);
router.post('/pubmed', (0, middleware_1.validate)(papers_schema_1.fetchByPubmedSchema), papers_controller_1.PapersController.fetchByPubmedId);
router.post('/upload', middleware_1.uploadMiddleware, papers_controller_1.PapersController.uploadPDF);
router.get('/', (0, middleware_1.validate)(papers_schema_1.listPapersSchema), papers_controller_1.PapersController.listPapers);
router.get('/:id', papers_controller_1.PapersController.getPaperById);
router.delete('/:id', papers_controller_1.PapersController.deletePaper);
exports.default = router;
