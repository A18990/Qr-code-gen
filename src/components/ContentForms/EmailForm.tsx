import React from 'react';
import { EmailContentData } from '../../types';
import { Mail, AlertCircle } from 'lucide-react';

interface EmailFormProps {
  data: EmailContentData;
  onChange: (data: EmailContentData) => void;
  isValid: boolean;
  errorMessage?: string;
}

export const EmailForm: React.FC<EmailFormProps> = ({
  data,
  onChange,
  isValid,
  errorMessage,
}) => {
  return (
    <div className="space-y-3.5">
      <div>
        <label htmlFor="email-input" className="block text-sm font-semibold text-slate-800 mb-1.5">
          Recipient Email <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail className="w-5 h-5" />
          </div>
          <input
            id="email-input"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="support@yourbusiness.com"
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-sm"
          />
        </div>
        {errorMessage && data.email && (
          <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {errorMessage}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email-subject" className="block text-xs font-semibold text-slate-700 mb-1">
          Preset Subject (Optional)
        </label>
        <input
          id="email-subject"
          type="text"
          value={data.subject}
          onChange={(e) => onChange({ ...data, subject: e.target.value })}
          placeholder="e.g. Inquiry regarding services"
          className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
        />
      </div>

      <div>
        <label htmlFor="email-body" className="block text-xs font-semibold text-slate-700 mb-1">
          Preset Message Body (Optional)
        </label>
        <textarea
          id="email-body"
          rows={3}
          value={data.body}
          onChange={(e) => onChange({ ...data, body: e.target.value })}
          placeholder="Hello team, I would like to learn more about..."
          className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 resize-y"
        />
      </div>

      <p className="text-xs text-slate-500">
        When scanned, the scanner's default mail app opens with a pre-filled draft.
      </p>
    </div>
  );
};
