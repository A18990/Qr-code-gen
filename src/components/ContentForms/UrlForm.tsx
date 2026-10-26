import React from 'react';
import { UrlContentData } from '../../types';
import { Globe, AlertCircle, CheckCircle2 } from 'lucide-react';

interface UrlFormProps {
  data: UrlContentData;
  onChange: (data: UrlContentData) => void;
  isValid: boolean;
  errorMessage?: string;
}

export const UrlForm: React.FC<UrlFormProps> = ({
  data,
  onChange,
  isValid,
  errorMessage,
}) => {
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ url: e.target.value });
  };

  const handleProtocolSelect = (protocol: string) => {
    const raw = data.url.replace(/^https?:\/\//i, '');
    onChange({ url: `${protocol}://${raw}` });
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="url-input" className="block text-sm font-semibold text-slate-800">
            Website URL
          </label>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => handleProtocolSelect('https')}
              className="px-2 py-0.5 rounded text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors"
            >
              https://
            </button>
            <button
              type="button"
              onClick={() => handleProtocolSelect('http')}
              className="px-2 py-0.5 rounded text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors"
            >
              http://
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Globe className="w-5 h-5" />
          </div>
          <input
            id="url-input"
            type="text"
            value={data.url}
            onChange={handleUrlChange}
            placeholder="https://example.com or codemitra.app/menu"
            aria-describedby={errorMessage ? 'url-error' : undefined}
            aria-invalid={!isValid}
            className={`w-full pl-11 pr-10 py-3 bg-white border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
              !isValid && data.url
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
            }`}
          />
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            {data.url && (
              isValid ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-500" />
              )
            )}
          </div>
        </div>

        {errorMessage && data.url ? (
          <p id="url-error" className="mt-2 text-xs font-medium text-rose-600 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {errorMessage}
          </p>
        ) : (
          <p className="mt-1.5 text-xs text-slate-500">
            Tip: Link directly to your online menu, social profile, Google Maps location, or portfolio.
          </p>
        )}
      </div>

      {data.url && isValid && (
        <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg flex items-center gap-2 text-xs text-indigo-900">
          <span className="font-semibold uppercase tracking-wider text-[10px] text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
            Target
          </span>
          <span className="font-mono truncate">{data.url}</span>
        </div>
      )}
    </div>
  );
};
