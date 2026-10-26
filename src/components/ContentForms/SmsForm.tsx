import React from 'react';
import { SmsContentData } from '../../types';
import { MessageSquare, AlertCircle } from 'lucide-react';

interface SmsFormProps {
  data: SmsContentData;
  onChange: (data: SmsContentData) => void;
  isValid: boolean;
  errorMessage?: string;
}

export const SmsForm: React.FC<SmsFormProps> = ({
  data,
  onChange,
  isValid,
  errorMessage,
}) => {
  return (
    <div className="space-y-3.5">
      <div>
        <label htmlFor="sms-phone" className="block text-sm font-semibold text-slate-800 mb-1.5">
          Phone Number <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <input
            id="sms-phone"
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => onChange({ ...data, phoneNumber: e.target.value })}
            placeholder="+977 9801234567"
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-mono text-sm"
          />
        </div>
        {errorMessage && data.phoneNumber && (
          <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {errorMessage}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="sms-message" className="block text-xs font-semibold text-slate-700 mb-1">
          Preset SMS Text (Optional)
        </label>
        <textarea
          id="sms-message"
          rows={3}
          value={data.message}
          onChange={(e) => onChange({ ...data, message: e.target.value })}
          placeholder="e.g. SUBSCRIBE or HELLO CODEMITRA"
          className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 resize-y"
        />
      </div>

      <p className="text-xs text-slate-500">
        Great for SMS voting, customer support numbers, or automated keywords.
      </p>
    </div>
  );
};
