import React from 'react';
import { PhoneContentData } from '../../types';
import { Phone, AlertCircle } from 'lucide-react';

interface PhoneFormProps {
  data: PhoneContentData;
  onChange: (data: PhoneContentData) => void;
  isValid: boolean;
  errorMessage?: string;
}

export const PhoneForm: React.FC<PhoneFormProps> = ({
  data,
  onChange,
  isValid,
  errorMessage,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="phone-input" className="block text-sm font-semibold text-slate-800 mb-1.5">
          Phone Number <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Phone className="w-5 h-5" />
          </div>
          <input
            id="phone-input"
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => onChange({ phoneNumber: e.target.value })}
            placeholder="+977 9812345678 or +1 (555) 000-1234"
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-mono"
          />
        </div>
        {errorMessage && data.phoneNumber ? (
          <p className="mt-2 text-xs font-medium text-rose-600 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {errorMessage}
          </p>
        ) : (
          <p className="mt-2 text-xs text-slate-500">
            Include international country code (e.g. +977 for Nepal) so callers can connect globally.
          </p>
        )}
      </div>

      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
        When scanned, the user's mobile dialer opens automatically with this number ready to call.
      </div>
    </div>
  );
};
