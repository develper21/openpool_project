"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPubMedPaper = exports.validatePMID = void 0;
const axios_1 = __importDefault(require("axios"));
const fast_xml_parser_1 = require("fast-xml-parser");
const cache_1 = require("./cache");
const constants_1 = require("../config/constants");
const error_1 = require("../middleware/error");
const validatePMID = (pmid) => {
    return /^\d{1,8}$/.test(pmid);
};
exports.validatePMID = validatePMID;
const fetchPubMedPaper = async (pmid) => {
    if (!(0, exports.validatePMID)(pmid)) {
        throw new error_1.AppError('Invalid PubMed ID format', 400);
    }
    const cacheKey = cache_1.cache.generatePubmedKey(pmid);
    const cachedData = cache_1.cache.get(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    try {
        const response = await axios_1.default.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi', {
            params: {
                db: 'pubmed',
                id: pmid,
                retmode: 'xml',
            },
        });
        const parser = new fast_xml_parser_1.XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '@_',
        });
        const result = parser.parse(response.data);
        const article = result?.PubmedArticleSet?.PubmedArticle?.MedlineCitation?.Article;
        if (!article) {
            throw new error_1.AppError('PubMed paper not found', 404);
        }
        // Extract Title
        const title = article.ArticleTitle || 'Untitled';
        // Extract Abstract
        let abstract = '';
        const abstractText = article.Abstract?.AbstractText;
        if (Array.isArray(abstractText)) {
            abstract = abstractText.map((t) => (typeof t === 'string' ? t : t['#text'] || '')).join('\n');
        }
        else if (typeof abstractText === 'string') {
            abstract = abstractText;
        }
        else if (abstractText?.['#text']) {
            abstract = abstractText['#text'];
        }
        // Extract Authors
        const authors = [];
        const authorList = article.AuthorList?.Author;
        if (Array.isArray(authorList)) {
            authorList.forEach((auth) => {
                if (auth.LastName && auth.ForeName) {
                    authors.push(`${auth.LastName}, ${auth.ForeName}`);
                }
            });
        }
        else if (authorList) {
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
            const doiObj = articleIdList.find((id) => id['@_IdType'] === 'doi');
            doi = doiObj?.['#text'] || '';
        }
        const paper = {
            pubmedId: pmid,
            title,
            abstract,
            authors,
            journal,
            publishedDate,
            doi,
        };
        cache_1.cache.set(cacheKey, paper, constants_1.CONSTANTS.PUBMED_CACHE_TTL);
        return paper;
    }
    catch (error) {
        if (error instanceof error_1.AppError)
            throw error;
        if (error.response?.status === 404) {
            throw new error_1.AppError('PubMed ID not found', 404);
        }
        throw new error_1.AppError('Failed to fetch from PubMed API', 502);
    }
};
exports.fetchPubMedPaper = fetchPubMedPaper;
