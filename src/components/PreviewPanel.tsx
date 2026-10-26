import React, { useEffect, useRef, useState } from 'react';
import { QRStylingConfig } from '../types';
import { createQRCodeInstance, generatePngBlob, generateSvgBlob, copyQrToClipboard } from '../utils/qrRenderer';
import { evaluateContrast } from '../utils/colorUtils';
import { triggerDownload } from '../utils/zipExporter';
import {
  Download,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Eye,
  FileCode,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

interface PreviewPanelProps {
  payload: string;
  isValid: boolean;
  errorMessage?: string;
  suggestedFilename: string;
  config: QRStylingConfig;
  onRestoreSafeDefaults: () => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  payload,
  isValid,
  errorMessage,
  suggestedFilename,
  config,
  onRestoreSafeDefaults,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [isExportingSvg, setIsExportingSvg] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPayloadRaw, setShowPayloadRaw] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // Evaluate contrast & scan safety
  const contrast = evaluateContrast(
    config.foregroundColor,
    config.backgroundColor,
    config.transparentBackground
  );

  const hasLogo = Boolean(config.logo);
  const isLogoTooBig = Boolean(config.logo && config.logo.size > 0.28);
  const isEclLowForLogo = Boolean(hasLogo && config.errorCorrectionLevel === 'L');

  // Render QR in DOM container whenever payload or config changes
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous preview elements
    containerRef.current.innerHTML = '';

    const effectivePayload = isValid && payload ? payload : 'https://codemitra.app';
    const qr = createQRCodeInstance(effectivePayload, config, 280);

    qr.append(containerRef.current);
  }, [payload, isValid, config]);

  const handleDownloadPng = async () => {
    if (!isValid || !payload) {
      setExportError('Please enter valid content before downloading.');
      return;
    }
    setExportError(null);
    setIsExportingPng(true);

    try {
      const { blob } = await generatePngBlob(payload, config, config.outputSize);
      triggerDownload(blob, `${suggestedFilename}.png`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'PNG export failed';
      setExportError(msg);
    } finally {
      setIsExportingPng(false);
    }
  };

  const handleDownloadSvg = async () => {
    if (!isValid || !payload) {
      setExportError('Please enter valid content before downloading.');
      return;
    }
    setExportError(null);
    setIsExportingSvg(true);

    try {
      const { blob } = await generateSvgBlob(payload, config, config.outputSize);
      triggerDownload(blob, `${suggestedFilename}.svg`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'SVG export failed';
      setExportError(msg);
    } finally {
      setIsExportingSvg(false);
    }
  };

  const handleCopyClipboard = async () => {
    if (!isValid || !payload) return;
    try {
      await copyQrToClipboard(payload, config);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Clipboard copy not supported.';
      setExportError(msg);
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-slate-800">Live QR Preview</h2>
          <span className="text-[11px] text-slate-500">
            Export resolution: {config.outputSize} × {config.outputSize}px
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {contrast.isScanSafe && !isLogoTooBig ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              Scan Safe
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5" />
              Check Contrast
            </span>
          )}
        </div>
      </div>

      {/* QR Canvas / SVG Preview Container */}
      <div className="relative my-3 sm:my-4 p-3 sm:p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 shadow-inner flex items-center justify-center min-h-[250px] sm:min-h-[300px] w-full max-w-full sm:max-w-[320px] overflow-hidden">
        {/* Transparent check pattern if transparent */}
        {config.transparentBackground && (
          <div
            className="absolute inset-2 sm:inset-4 rounded-xl opacity-30 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
              backgroundSize: '12px 12px',
            }}
          />
        )}

        <div
          ref={containerRef}
          className="relative z-10 flex items-center justify-center overflow-hidden rounded-lg transition-transform max-w-full [&_canvas]:max-w-full [&_canvas]:h-auto [&_canvas]:block [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:block"
        />

        {(!isValid || !payload) && (
          <div className="absolute inset-0 z-20 backdrop-blur-[2px] bg-white/70 rounded-2xl flex flex-col items-center justify-center p-3 text-center">
            <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500 mb-1.5 animate-bounce" />
            <span className="text-xs font-semibold text-slate-800">
              Awaiting Valid Input
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 max-w-[200px] mt-0.5">
              {errorMessage || 'Fill in the fields on the left to activate full export.'}
            </span>
          </div>
        )}
      </div>

      {/* Scan Reliability & Guidance Card */}
      <div className="w-full space-y-2 mb-4">
        {(!contrast.isScanSafe || isLogoTooBig || isEclLowForLogo) && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              Scan Reliability Notice
            </div>
            {!contrast.isScanSafe && (
              <p className="text-[11px] leading-tight">
                • {contrast.message}
              </p>
            )}
            {isLogoTooBig && (
              <p className="text-[11px] leading-tight">
                • Logo size is high ({Math.round(config.logo!.size * 100)}%). Reduce slightly or use high error correction to prevent read failures.
              </p>
            )}
            {isEclLowForLogo && (
              <p className="text-[11px] leading-tight">
                • Center logo with 'L' error correction risks unreadable codes. We recommend level 'H'.
              </p>
            )}
            <button
              type="button"
              onClick={onRestoreSafeDefaults}
              className="mt-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Restore scan-safe design settings
            </button>
          </div>
        )}

        {/* Physical scan advisory */}
        <div className="flex items-start gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] text-slate-600">
          <Smartphone className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-800">Pro tip:</strong> Always scan this preview with your mobile camera before sending to bulk printing or vinyl sign production.
          </span>
        </div>
      </div>

      {/* Action Buttons: PNG & SVG Downloads */}
      <div className="w-full space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          {/* PNG Download */}
          <button
            type="button"
            disabled={!isValid || !payload || isExportingPng}
            onClick={handleDownloadPng}
            className={`w-full py-3 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
              !isValid || !payload
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-[0.98]'
            }`}
          >
            <Download className="w-4 h-4" />
            {isExportingPng ? 'Generating...' : `PNG (${config.outputSize}px)`}
          </button>

          {/* SVG Download */}
          <button
            type="button"
            disabled={!isValid || !payload || isExportingSvg}
            onClick={handleDownloadSvg}
            className={`w-full py-3 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer shadow-xs ${
              !isValid || !payload
                ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 active:scale-[0.98]'
            }`}
          >
            <FileCode className="w-4 h-4 text-indigo-600" />
            {isExportingSvg ? 'Generating...' : 'Vector SVG'}
          </button>
        </div>

        {/* Clipboard Copy Button */}
        <button
          type="button"
          disabled={!isValid || !payload}
          onClick={handleCopyClipboard}
          className={`w-full py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
            copied
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : !isValid || !payload
              ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Copied image to clipboard!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              Copy Image to Clipboard
            </>
          )}
        </button>

        {exportError && (
          <p className="text-xs text-rose-600 font-medium text-center">
            {exportError}
          </p>
        )}
      </div>

      {/* Payload Inspection Accordion */}
      <div className="w-full mt-4 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowPayloadRaw(!showPayloadRaw)}
          className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            {showPayloadRaw ? 'Hide Encoded Payload' : 'View Encoded Payload'}
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            {suggestedFilename}.png
          </span>
        </button>

        {showPayloadRaw && (
          <div className="mt-2 p-2.5 bg-slate-900 text-slate-200 rounded-xl text-[11px] font-mono break-all max-h-36 overflow-y-auto leading-relaxed">
            {payload || 'No payload'}
          </div>
        )}
      </div>
    </div>
  );
};
