import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { cache } from './cache';
import { CONSTANTS } from '../config/constants';
import { AppError } from '../middleware/error';

export interface PubMedPaper {
  pubmedId: string;
  title: string;
  abstract: string;
  authors: string[];
  journal: string;
  publishedDate: string;
  doi?: string;
}

export const validatePMID = (pmid: string): boolean => {
  return /^\d{1,8}$/.test(pmid);
};

export const fetchPubMedPaper = async (pmid: string): Promise<PubMedPaper> => {
  if (!validatePMID(pmid)) {
    throw new AppError('Invalid PubMed ID format', 400);
  }

  const cacheKey = cache.generatePubmedKey(pmid);
  const cachedData = cache.get<PubMedPaper>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi', {
      params: {
        db: 'pubmed',
        id: pmid,
        retmode: 'xml',
      },
    });

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const result = parser.parse(response.data);
    const article = result?.PubmedArticleSet?.PubmedArticle?.MedlineCitation?.Article;

    if (!article) {
      throw new AppError('PubMed paper not found', 404);
    }

    // Extract Title
    const title = article.ArticleTitle || 'Untitled';

    // Extract Abstract
    let abstract = '';
    const abstractText = article.Abstract?.AbstractText;
    if (Array.isArray(abstractText)) {
      abstract = abstractText.map((t: any) => (typeof t === 'string' ? t : t['#text'] || '')).join('\n');
    } else if (typeof abstractText === 'string') {
      abstract = abstractText;
    } else if (abstractText?.['#text']) {
      abstract = abstractText['#text'];
    }

    // Extract Authors
    const authors: string[] = [];
    const authorList = article.AuthorList?.Author;
    if (Array.isArray(authorList)) {
      authorList.forEach((auth: any) => {
        if (auth.LastName && auth.ForeName) {
          authors.push(`${auth.LastName}, ${auth.ForeName}`);
        }
      });
    } else if (authorList) {
      if (authorList.LastName && authorList.ForeName) {
        authors.push(`${authorList.LastName}, ${authorList.ForeName}`);
      }
    }

    // Extract Journal
    const journal = article.Journal?.Title || 'Unknown Journal';

    // Extract Published Date
    const pubDate = article.Journal?.JournalIssue?.PubDate;
    const year = pubDate?.Year || '';
    const month = pubDate?.Month || '';
    const publishedDate = `${year} ${month}`.trim() || 'Unknown Date';

    // Extract DOI
    let doi = '';
    const articleIdList = result?.PubmedArticleSet?.PubmedArticle?.PubmedData?.ArticleIdList?.ArticleId;
    if (Array.isArray(articleIdList)) {
      const doiObj = articleIdList.find((id: any) => id['@_IdType'] === 'doi');
      doi = doiObj?.['#text'] || '';
    }

    const paper: PubMedPaper = {
      pubmedId: pmid,
      title,
      abstract,
      authors,
      journal,
      publishedDate,
      doi,
    };

    cache.set(cacheKey, paper, CONSTANTS.PUBMED_CACHE_TTL);

    return paper;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    
    if (error.response?.status === 404) {
      throw new AppError('PubMed ID not found', 404);
    }

    throw new AppError('Failed to fetch from PubMed API', 502);
  }
};
