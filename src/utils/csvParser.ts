import Papa from 'papaparse';
import { BulkRowItem } from '../types';
import { sanitizeFilename } from './qrPayload';

export interface CsvParseResult {
  headers: string[];
  rows: Record<string, string>[];
  errors: string[];
}

export function parseCsvFile(file: File): Promise<CsvParseResult> {
  return new Promise((resolve) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: (h) => h.trim(),
      complete: (results) => {
        const headers = results.meta.fields || [];
        const rows = results.data.filter((row) => {
          return Object.values(row).some((val) => val && String(val).trim() !== '');
        });
        const errors = results.errors.map((e) => `Row ${e.row ?? 'unknown'}: ${e.message}`);
        resolve({ headers, rows, errors });
      },
      error: (err) => {
        resolve({
          headers: [],
          rows: [],
          errors: [err.message || 'Failed to parse CSV file.'],
        });
      },
    });
  });
}

export function buildBulkRowItems(
  rows: Record<string, string>[],
  contentColumn: string,
  filenameColumn?: string
): BulkRowItem[] {
  const nameOccurrences = new Map<string, number>();

  return rows.map((row, index) => {
    const rawContent = (row[contentColumn] || '').trim();
    let rawFilename = filenameColumn && row[filenameColumn] ? row[filenameColumn].trim() : '';

    if (!rawFilename) {
      rawFilename = `qr-${index + 1}`;
    }

    // Sanitize filename to prevent path traversal and illegal chars
    let cleanName = sanitizeFilename(rawFilename, `item-${index + 1}`);

    // Prevent collisions
    const count = nameOccurrences.get(cleanName) || 0;
    nameOccurrences.set(cleanName, count + 1);
    if (count > 0) {
      cleanName = `${cleanName}-${count + 1}`;
    }

    const isValid = rawContent.length > 0;
    const errorMessage = isValid ? undefined : 'Row content is empty';

    return {
      id: `bulk-row-${index}-${Date.now()}`,
      rowIndex: index + 1,
      content: rawContent,
      filename: cleanName,
      isValid,
      errorMessage,
      selected: isValid,
    };
  });
}

export const SAMPLE_CSV_CONTENT = `Name,URL or Content,Notes
Kathmandu Cafe Menu,https://example.com/menu/kathmandu,Table 1-10
Free Wi-Fi Guest,WIFI:S:GuestNetwork;T:WPA;P:GuestPass2026;;Lobby Access
Customer Feedback,https://example.com/feedback,Receipt QR
Pokhara Trek Guide,https://example.com/guide/annapurna,Visitor Center
Emergency Hotline,tel:+97714200000,24/7 Support`;
