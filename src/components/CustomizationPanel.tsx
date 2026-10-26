import React, { useRef } from 'react';
import {
  QRStylingConfig,
  DotPatternType,
  CornerSquareType,
  CornerDotType,
  ErrorCorrectionLevel,
} from '../types';
import { DESIGN_PRESETS, PRESET_LOGOS } from '../constants/presets';
import { evaluateContrast } from '../utils/colorUtils';
import {
  Palette,
  Shapes,
  Image as ImageIcon,
  Sparkles,
  Sliders,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Upload,
  X,
  Maximize2,
} from 'lucide-react';

interface CustomizationPanelProps {
  config: QRStylingConfig;
  onChange: (config: QRStylingConfig) => void;
  onRestoreSafeDefaults: () => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  config,
  onChange,
  onRestoreSafeDefaults,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contrastEval = evaluateContrast(
    config.foregroundColor,
    config.backgroundColor,
    config.transparentBackground
  );

  const handlePresetSelect = (presetId: string) => {
    const preset = DESIGN_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    onChange({
      ...config,
      foregroundColor: preset.foregroundColor,
      backgroundColor: preset.backgroundColor,
      transparentBackground: false,
      dotType: preset.dotType,
      cornerSquareType: preset.cornerSquareType,
      cornerDotType: preset.cornerDotType,
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(png|jpeg|jpg|webp|svg\+xml)$/i)) {
      alert('Please upload a valid image file (PNG, JPG, WebP, or SVG).');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert('Logo file size must be under 3MB.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    onChange({
      ...config,
      // When a logo is added, elevate error correction to 'H' for scan reliability
      errorCorrectionLevel: 'H',
      logo: {
        url: objectUrl,
        size: 0.25,
        margin: 4,
        name: file.name,
      },
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePresetLogoSelect = (iconSvg: string, name: string) => {
    const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(iconSvg)}`;
    onChange({
      ...config,
      errorCorrectionLevel: 'H',
      logo: {
        url: svgDataUri,
        size: 0.24,
        margin: 4,
        name,
      },
    });
  };

  const handleRemoveLogo = () => {
    if (config.logo?.url.startsWith('blob:')) {
      URL.revokeObjectURL(config.logo.url);
    }
    onChange({
      ...config,
      logo: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Design Presets */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Curated Color Presets
          </label>
          <button
            type="button"
            onClick={onRestoreSafeDefaults}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Restore Safe Default
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DESIGN_PRESETS.map((preset) => {
            const isSelected =
              config.foregroundColor === preset.foregroundColor &&
              config.backgroundColor === preset.backgroundColor &&
              config.dotType === preset.dotType;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset.id)}
                className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                      style={{ backgroundColor: preset.foregroundColor }}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                      style={{ backgroundColor: preset.backgroundColor }}
                    />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800 truncate">
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight line-clamp-1">
                    {preset.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors & Contrast */}
      <div className="pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
          <Palette className="w-3.5 h-3.5 text-indigo-600" />
          Colors & Contrast Ratio
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Foreground */}
          <div className="p-3 bg-white border border-slate-200 rounded-xl">
            <span className="block text-xs font-semibold text-slate-700 mb-2">
              Code Pattern Color
            </span>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.foregroundColor}
                onChange={(e) =>
                  onChange({ ...config, foregroundColor: e.target.value })
                }
                className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white"
                title="Choose foreground color"
              />
              <input
                type="text"
                value={config.foregroundColor}
                onChange={(e) =>
                  onChange({ ...config, foregroundColor: e.target.value })
                }
                className="w-24 px-2 py-1.5 text-xs font-mono font-medium border border-slate-200 rounded-lg text-slate-800 uppercase focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Background */}
          <div className="p-3 bg-white border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="block text-xs font-semibold text-slate-700">
                Background Color
              </span>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.transparentBackground}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      transparentBackground: e.target.checked,
                    })
                  }
                  className="w-3.5 h-3.5 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-[11px] font-medium">Transparent</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                disabled={config.transparentBackground}
                value={config.backgroundColor}
                onChange={(e) =>
                  onChange({ ...config, backgroundColor: e.target.value })
                }
                className={`w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white ${
                  config.transparentBackground ? 'opacity-40 cursor-not-allowed' : ''
                }`}
                title="Choose background color"
              />
              <input
                type="text"
                disabled={config.transparentBackground}
                value={config.transparentBackground ? 'TRANSPARENT' : config.backgroundColor}
                onChange={(e) =>
                  onChange({ ...config, backgroundColor: e.target.value })
                }
                className={`w-24 px-2 py-1.5 text-xs font-mono font-medium border border-slate-200 rounded-lg text-slate-800 uppercase focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                  config.transparentBackground ? 'bg-slate-100 text-slate-400' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Contrast status box */}
        <div
          className={`mt-3 p-2.5 rounded-xl border text-xs flex items-center justify-between ${
            contrastEval.isScanSafe
              ? contrastEval.level === 'excellent'
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                : 'bg-blue-50/70 border-blue-200 text-blue-900'
              : 'bg-rose-50/80 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {contrastEval.isScanSafe ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            )}
            <span className="font-semibold">{contrastEval.label}:</span>
            <span className="text-[11px] line-clamp-1">{contrastEval.message}</span>
          </div>
          {!contrastEval.isScanSafe && (
            <button
              type="button"
              onClick={onRestoreSafeDefaults}
              className="text-[11px] font-bold text-rose-700 underline flex-shrink-0 ml-2"
            >
              Fix
            </button>
          )}
        </div>
      </div>

      {/* Pattern Shapes */}
      <div className="pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
          <Shapes className="w-3.5 h-3.5 text-indigo-600" />
          Dot & Corner Styles
        </label>

        {/* Dot pattern */}
        <div className="mb-3.5">
          <span className="block text-xs font-semibold text-slate-700 mb-2">
            Body Dot Pattern
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {(
              [
                { id: 'square', label: 'Square' },
                { id: 'dots', label: 'Dots' },
                { id: 'rounded', label: 'Rounded' },
                { id: 'classy', label: 'Classy' },
                { id: 'classy-rounded', label: 'Classy-R' },
                { id: 'extra-rounded', label: 'Pill' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ ...config, dotType: item.id as DotPatternType })}
                className={`py-2 px-1 text-xs rounded-xl border font-medium transition-all text-center ${
                  config.dotType === item.id
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Corner Eyes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-2">
              Corner Eye Frame
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'square', label: 'Square' },
                  { id: 'extra-rounded', label: 'Rounded' },
                  { id: 'dot', label: 'Circle' },
                ] as const
              ).map((eye) => (
                <button
                  key={eye.id}
                  type="button"
                  onClick={() =>
                    onChange({ ...config, cornerSquareType: eye.id as CornerSquareType })
                  }
                  className={`py-2 px-1 text-xs rounded-xl border font-medium text-center transition-all ${
                    config.cornerSquareType === eye.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {eye.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-2">
              Corner Eye Center
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: 'square', label: 'Square Dot' },
                  { id: 'dot', label: 'Round Dot' },
                ] as const
              ).map((eyeDot) => (
                <button
                  key={eyeDot.id}
                  type="button"
                  onClick={() =>
                    onChange({ ...config, cornerDotType: eyeDot.id as CornerDotType })
                  }
                  className={`py-2 px-1 text-xs rounded-xl border font-medium text-center transition-all ${
                    config.cornerDotType === eyeDot.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {eyeDot.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center Logo Overlay */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
            Center Logo Overlay
          </label>
          {config.logo && (
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Remove Logo
            </button>
          )}
        </div>

        {/* Upload or active logo */}
        {config.logo ? (
          <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1.5 shadow-xs overflow-hidden">
                <img
                  src={config.logo.url}
                  alt="QR Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-800 truncate">
                  {config.logo.name || 'Custom Logo'}
                </div>
                <div className="text-[11px] text-slate-500">
                  Processed 100% locally in browser memory
                </div>
              </div>
            </div>

            {/* Logo Size Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Logo Size</span>
                <span>{Math.round(config.logo.size * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.15}
                max={0.32}
                step={0.01}
                value={config.logo.size}
                onChange={(e) =>
                  onChange({
                    ...config,
                    logo: {
                      ...config.logo!,
                      size: parseFloat(e.target.value),
                    },
                  })
                }
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">
                Keep under 28% for easiest camera detection. Error correction is set to High (H).
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Upload Box */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 px-3 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl text-center bg-white hover:bg-indigo-50/30 transition-all cursor-pointer group"
            >
              <Upload className="w-5 h-5 mx-auto text-slate-400 group-hover:text-indigo-600 mb-1 transition-colors" />
              <span className="block text-xs font-semibold text-slate-700 group-hover:text-indigo-700">
                Upload Custom Logo (PNG, JPG, SVG, WebP)
              </span>
              <span className="block text-[11px] text-slate-400 mt-0.5">
                Processed locally. Max 3MB. No files are uploaded to any server.
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={handleLogoUpload}
              className="hidden"
            />

            {/* Preset Logos */}
            <div>
              <span className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                Or pick a quick icon:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {PRESET_LOGOS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePresetLogoSelect(preset.iconSvg, preset.name)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span
                      className="w-3.5 h-3.5 flex items-center justify-center"
                      dangerouslySetInnerHTML={{
                        __html: preset.iconSvg.replace(
                          '<svg ',
                          '<svg width="14" height="14" '
                        ),
                      }}
                    />
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Options: Quiet Zone & Error Correction */}
      <div className="pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
          <Sliders className="w-3.5 h-3.5 text-indigo-600" />
          Reliability & Export Dimensions
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Error Correction */}
          <div className="p-3 bg-white border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Error Correction Level
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {config.errorCorrectionLevel === 'L'
                  ? '7% recovery'
                  : config.errorCorrectionLevel === 'M'
                  ? '15% recovery'
                  : config.errorCorrectionLevel === 'Q'
                  ? '25% recovery'
                  : '30% recovery (Max)'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => onChange({ ...config, errorCorrectionLevel: lvl })}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-all text-center ${
                    config.errorCorrectionLevel === lvl
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">
              High (H) is required when placing logos in the center so damaged modules recover.
            </p>
          </div>

          {/* Export Resolution */}
          <div className="p-3 bg-white border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                Export Resolution
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {config.outputSize} × {config.outputSize}px
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { size: 512, label: 'Standard (512px)' },
                { size: 1024, label: 'HD (1024px)' },
                { size: 2048, label: 'Print (2048px)' },
              ].map((opt) => (
                <button
                  key={opt.size}
                  type="button"
                  onClick={() => onChange({ ...config, outputSize: opt.size })}
                  className={`py-1.5 px-1 text-[11px] font-medium rounded-lg border transition-all text-center truncate ${
                    config.outputSize === opt.size
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.size}px
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">
              Use 1024px or 2048px for sharp print posters, menus and banners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
