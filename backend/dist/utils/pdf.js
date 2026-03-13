"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTitleFromPDF = exports.extractTextFromPDF = void 0;
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = require("pdf-parse");
const constants_1 = require("../config/constants");
const extractTextFromPDF = async (filePath) => {
    const dataBuffer = fs_1.default.readFileSync(filePath);
    const parser = new pdf_parse_1.PDFParse({ data: dataBuffer });
    const data = await parser.getText();
    await parser.destroy(); // Always call destroy to free memory
    let text = data.text || '';
    const pageCount = data.total || 0;
    let truncated = false;
    // Clean text: remove excessive whitespace, null bytes, control characters
    text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control characters
    text = text.replace(/\s+/g, ' ').trim(); // Remove excessive whitespace
    if (text.length > constants_1.CONSTANTS.MAX_TEXT_CHARS_FOR_AI) {
        text = text.substring(0, constants_1.CONSTANTS.MAX_TEXT_CHARS_FOR_AI);
        truncated = true;
    }
    return {
        text,
        pageCount,
        truncated,
    };
};
exports.extractTextFromPDF = extractTextFromPDF;
const extractTitleFromPDF = (text) => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    for (const line of lines) {
        if (line.length < 200) {
            return line;
        }
    }
    return 'Untitled Document';
};
exports.extractTitleFromPDF = extractTitleFromPDF;
