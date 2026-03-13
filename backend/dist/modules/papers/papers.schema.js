"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPapersSchema = exports.fetchByPubmedSchema = void 0;
const zod_1 = require("zod");
exports.fetchByPubmedSchema = zod_1.z.object({
    body: zod_1.z.object({
        pubmedId: zod_1.z.string().regex(/^\d{1,8}$/, 'PubMed ID must be a numeric string between 1 and 8 digits'),
    }),
});
exports.listPapersSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform(v => (v ? parseInt(v, 10) : 1)),
        limit: zod_1.z.string().optional().transform(v => (v ? parseInt(v, 10) : 10)),
        search: zod_1.z.string().optional(),
        sourceType: zod_1.z.enum(['PUBMED', 'PDF', 'MANUAL']).optional(),
    }),
});
