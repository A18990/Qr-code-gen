import JSZip from 'jszip';
import { BulkRowItem, QRStylingConfig } from '../types';
import { generatePngBlob, generateSvgBlob } from './qrRenderer';

export interface BatchProgressCallback {
  (current: number, total: number, percent: number, currentItemName: string): void;
}

export async function exportBulkZip(
  items: BulkRowItem[],
  config: QRStylingConfig,
  format: 'png' | 'svg',
  onProgress?: BatchProgressCallback,
  isCancelled?: () => boolean
): Promise<{ zipBlob: Blob; totalExported: number }> {
  const zip = new JSZip();
  const folder = zip.folder('codemitra-qr-codes');
  const total = items.length;
  let processed = 0;
  const manifestItems: Array<{ filename: string; contentSnippet: string; status: string }> = [];

  for (let i = 0; i < total; i++) {
    if (isCancelled && isCancelled()) {
      throw new Error('Export cancelled by user.');
    }

    const item = items[i];
    if (!item.selected || !item.isValid || !item.content.trim()) {
      continue;
    }

    try {
      if (format === 'svg') {
        const { blob } = await generateSvgBlob(item.content, config, config.outputSize);
        const fileName = `${item.filename}.svg`;
        folder?.file(fileName, blob);
        manifestItems.push({
          filename: fileName,
          contentSnippet: item.content.slice(0, 80),
          status: 'success',
        });
      } else {
        const { blob } = await generatePngBlob(item.content, config, config.outputSize);
        const fileName = `${item.filename}.png`;
        folder?.file(fileName, blob);
        manifestItems.push({
          filename: fileName,
          contentSnippet: item.content.slice(0, 80),
          status: 'success',
        });
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      manifestItems.push({
        filename: `${item.filename}.${format}`,
        contentSnippet: item.content.slice(0, 80),
        status: `failed: ${errMsg}`,
      });
    }

    processed++;
    if (onProgress) {
      const percent = Math.round((processed / total) * 100);
      onProgress(processed, total, percent, item.filename);
    }

    // Yield execution to event loop to keep UI smooth and responsive
    await new Promise((resolve) => setTimeout(resolve, 15));
  }

  // Include a summary manifest
  const manifestData = {
    generator: 'CodeMitra - Free & Private QR Code Generator',
    generatedAt: new Date().toISOString(),
    totalExported: manifestItems.filter((m) => m.status === 'success').length,
    format,
    resolution: `${config.outputSize}x${config.outputSize}px`,
    items: manifestItems,
  };
  zip.file('manifest.json', JSON.stringify(manifestData, null, 2));

  // Generate zip file with deflate compression
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  return { zipBlob, totalExported: processed };
}

export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Clean up object URL safely after delay
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
