import React from 'react';
import { TextContentData } from '../../types';
import { Type, AlertCircle } from 'lucide-react';

interface TextFormProps {
  data: TextContentData;
  onChange: (data: TextContentData) => void;
  isValid: boolean;
  errorMessage?: string;
}

export const TextForm: React.FC<TextFormProps> = ({
  data,
  onChange,
  isValid,
  errorMessage,
}) => {
  const charCount = data.text.length;
  // Recommended safe QR text payload limit for standard cameras
  const isLarge = charCount > 500;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="text-input" className="block text-sm font-semibold text-slate-800">
          Plain Text or Message
        </label>
        <span
          className={`text-xs font-mono font-medium ${
            isLarge ? 'text-amber-600' : 'text-slate-400'
          }`}
        >
          {charCount} characters
        </span>
      </div>

      <div className="relative">
        <textarea
          id="text-input"
          rows={5}
          value={data.text}
          onChange={(e) => onChange({ text: e.target.value })}
          placeholder="Type any message, instructions, serial number, quote, or note. Unicode and multiple lines are fully supported."
          aria-describedby={errorMessage ? 'text-error' : undefined}
          aria-invalid={!isValid}
          className={`w-full p-3.5 bg-white border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-y ${
            !isValid && data.text
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
              : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
          }`}
        />
      </div>

      {isLarge && (
        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>
            Longer text creates a denser QR pattern. We recommend keeping messages concise for easiest camera scanning across all phones.
          </p>
        </div>
      )}

      {errorMessage && data.text && (
        <p id="text-error" className="text-xs font-medium text-rose-600 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {errorMessage}
        </p>
      )}

      <p className="text-xs text-slate-500">
        When scanned, phones will display this text directly on the screen without opening a browser.
      </p>
    </div>
  );
};
