import fs from 'fs';
import { PDFParse } from 'pdf-parse';
import { CONSTANTS } from '../config/constants';

export interface ParsedPDF {
  text: string;
  pageCount: number;
  truncated: boolean;
}

export const extractTextFromPDF = async (filePath: string): Promise<ParsedPDF> => {
  const dataBuffer = fs.readFileSync(filePath);
  
  const parser = new PDFParse({ data: dataBuffer });
  const data = await parser.getText();
  await parser.destroy(); // Always call destroy to free memory

  let text = data.text || '';
  const pageCount = data.total || 0;
  let truncated = false;

  // Clean text: remove excessive whitespace, null bytes, control characters
  text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control characters
  text = text.replace(/\s+/g, ' ').trim(); // Remove excessive whitespace

  if (text.length > CONSTANTS.MAX_TEXT_CHARS_FOR_AI) {
    text = text.substring(0, CONSTANTS.MAX_TEXT_CHARS_FOR_AI);
    truncated = true;
  }

  return {
    text,
    pageCount,
    truncated,
  };
};


export const extractTitleFromPDF = (text: string): string => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  for (const line of lines) {
    if (line.length < 200) {
      return line;
    }
  }

  return 'Untitled Document';
};
