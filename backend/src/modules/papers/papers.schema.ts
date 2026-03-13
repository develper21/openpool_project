import { z } from 'zod';

export const fetchByPubmedSchema = z.object({
  body: z.object({
    pubmedId: z.string().regex(/^\d{1,8}$/, 'PubMed ID must be a numeric string between 1 and 8 digits'),
  }),
});

export const listPapersSchema = z.object({
  query: z.object({
    page: z.string().optional().transform(v => (v ? parseInt(v, 10) : 1)),
    limit: z.string().optional().transform(v => (v ? parseInt(v, 10) : 10)),
    search: z.string().optional(),
    sourceType: z.enum(['PUBMED', 'PDF', 'MANUAL']).optional(),
  }),
});

export type ListPapersQuery = z.infer<typeof listPapersSchema>['query'];
