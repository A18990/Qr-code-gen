/**
 * Calculates WCAG 2.2 color contrast ratio and readability metrics
 */

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    return {
      r: parseInt(cleanHex[0] + cleanHex[0], 16),
      g: parseInt(cleanHex[1] + cleanHex[1], 16),
      b: parseInt(cleanHex[2] + cleanHex[2], 16),
    };
  }
  if (cleanHex.length === 6) {
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16),
    };
  }
  return null;
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  const [sR, sG, sB] = [r, g, b].map((val) => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;
}

export function calculateContrastRatio(fgHex: string, bgHex: string): number {
  const fg = hexToRgb(fgHex) || { r: 0, g: 0, b: 0 };
  const bg = hexToRgb(bgHex) || { r: 255, g: 255, b: 255 };

  const l1 = getRelativeLuminance(fg.r, fg.g, fg.b);
  const l2 = getRelativeLuminance(bg.r, bg.g, bg.b);

  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (brighter + 0.05) / (darker + 0.05);
}

export interface ContrastEvaluation {
  ratio: number;
  level: 'excellent' | 'good' | 'poor' | 'danger';
  label: string;
  isScanSafe: boolean;
  message: string;
}

export function evaluateContrast(fgHex: string, bgHex: string, isTransparent: boolean): ContrastEvaluation {
  if (isTransparent) {
    return {
      ratio: 5.0,
      level: 'good',
      label: 'Transparent BG',
      isScanSafe: true,
      message: 'Transparent background selected. Ensure code is placed on a light, high-contrast surface.',
    };
  }

  const ratio = calculateContrastRatio(fgHex, bgHex);
  const roundedRatio = Math.round(ratio * 10) / 10;

  if (ratio >= 7.0) {
    return {
      ratio: roundedRatio,
      level: 'excellent',
      label: 'Excellent Contrast',
      isScanSafe: true,
      message: `${roundedRatio}:1 contrast ratio. All standard smartphone camera sensors will decode this smoothly.`,
    };
  } else if (ratio >= 4.5) {
    return {
      ratio: roundedRatio,
      level: 'good',
      label: 'Good Contrast',
      isScanSafe: true,
      message: `${roundedRatio}:1 contrast ratio. Meets standard barcode scanner requirements.`,
    };
  } else if (ratio >= 3.0) {
    return {
      ratio: roundedRatio,
      level: 'poor',
      label: 'Low Contrast Warning',
      isScanSafe: false,
      message: `${roundedRatio}:1 contrast is low. Some phone cameras in dim lighting may struggle to detect edges.`,
    };
  } else {
    return {
      ratio: roundedRatio,
      level: 'danger',
      label: 'Unsafe Contrast',
      isScanSafe: false,
      message: `${roundedRatio}:1 contrast is critical. This code will likely fail to scan on most devices. Choose darker foreground or lighter background.`,
    };
  }
}
