import QRCodeStyling, {
  Options,
  DotType,
  CornerSquareType,
  CornerDotType,
  ErrorCorrectionLevel,
} from 'qr-code-styling';
import { QRStylingConfig } from '../types';

export function createQRCodeInstance(
  payload: string,
  config: QRStylingConfig,
  renderSize: number
): QRCodeStyling {
  const options: Options = {
    width: renderSize,
    height: renderSize,
    data: payload || 'https://codemitra.app',
    margin: config.margin,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: config.errorCorrectionLevel as ErrorCorrectionLevel,
    },
    image: config.logo?.url || undefined,
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: config.logo?.size || 0.25,
      margin: config.logo?.margin || 4,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      color: config.foregroundColor,
      type: config.dotType as DotType,
    },
    backgroundOptions: {
      color: config.transparentBackground ? 'rgba(255, 255, 255, 0)' : config.backgroundColor,
    },
    cornersSquareOptions: {
      color: config.foregroundColor,
      type: config.cornerSquareType as CornerSquareType,
    },
    cornersDotOptions: {
      color: config.foregroundColor,
      type: config.cornerDotType as CornerDotType,
    },
  };

  return new QRCodeStyling(options);
}

/**
 * Generates an SVG string representation and sanitizes it (removes any unsafe script tags)
 */
export async function generateSvgBlob(
  payload: string,
  config: QRStylingConfig,
  size = config.outputSize
): Promise<{ blob: Blob; url: string; svgText: string }> {
  const qr = createQRCodeInstance(payload, config, size);
  const rawData = await qr.getRawData('svg');

  if (!rawData) {
    throw new Error('Failed to generate SVG data from QR styling engine.');
  }

  const rawBlob = rawData instanceof Blob ? rawData : new Blob([rawData as unknown as BlobPart], { type: 'image/svg+xml' });
  let text = await rawBlob.text();

  // Sanitize SVG: remove script tags or on* attributes if any
  text = text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/on\w+="[^"]*"/gi, '');

  const sanitizedBlob = new Blob([text], { type: 'image/svg+xml;charset=utf-8' });
  const objectUrl = URL.createObjectURL(sanitizedBlob);

  return {
    blob: sanitizedBlob,
    url: objectUrl,
    svgText: text,
  };
}

/**
 * Generates a PNG blob at the configured high resolution (e.g. 512, 1024, 2048)
 */
export async function generatePngBlob(
  payload: string,
  config: QRStylingConfig,
  size = config.outputSize
): Promise<{ blob: Blob; url: string }> {
  const qr = createQRCodeInstance(payload, config, size);
  const rawData = await qr.getRawData('png');

  if (!rawData) {
    throw new Error('Failed to generate PNG blob from QR engine.');
  }

  const blob = rawData instanceof Blob ? rawData : new Blob([rawData as unknown as BlobPart], { type: 'image/png' });
  const objectUrl = URL.createObjectURL(blob);

  return { blob, url: objectUrl };
}

/**
 * Copies a PNG image to user clipboard
 */
export async function copyQrToClipboard(payload: string, config: QRStylingConfig): Promise<boolean> {
  if (!navigator.clipboard || !window.ClipboardItem) {
    throw new Error('Clipboard image writing is not supported in this browser.');
  }

  const { blob } = await generatePngBlob(payload, config, 1024);
  const item = new ClipboardItem({ 'image/png': blob });
  await navigator.clipboard.write([item]);
  return true;
}
