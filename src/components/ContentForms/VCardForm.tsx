import React from 'react';
import { VCardContentData } from '../../types';
import { User, Building, Phone, Mail, Globe, MapPin, FileText, AlertCircle } from 'lucide-react';

interface VCardFormProps {
  data: VCardContentData;
  onChange: (data: VCardContentData) => void;
  isValid: boolean;
  errorMessage?: string;
}

export const VCardForm: React.FC<VCardFormProps> = ({
  data,
  onChange,
  isValid,
  errorMessage,
}) => {
  const updateField = (field: keyof VCardContentData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="vcard-first" className="block text-xs font-semibold text-slate-700 mb-1">
            First Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="vcard-first"
              type="text"
              value={data.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              placeholder="e.g. Aarav"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="vcard-last" className="block text-xs font-semibold text-slate-700 mb-1">
            Last Name
          </label>
          <input
            id="vcard-last"
            type="text"
            value={data.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            placeholder="e.g. Sharma"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="vcard-org" className="block text-xs font-semibold text-slate-700 mb-1">
            Company / Organization
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Building className="w-4 h-4" />
            </div>
            <input
              id="vcard-org"
              type="text"
              value={data.organization}
              onChange={(e) => updateField('organization', e.target.value)}
              placeholder="e.g. Himalayan Tech Studio"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="vcard-title" className="block text-xs font-semibold text-slate-700 mb-1">
            Job Title
          </label>
          <input
            id="vcard-title"
            type="text"
            value={data.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="e.g. Founder & Creative Lead"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="vcard-phone" className="block text-xs font-semibold text-slate-700 mb-1">
            Phone / Work
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="vcard-phone"
              type="tel"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+977 9800000000"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 font-mono"
            />
          </div>
        </div>

        <div>
          <label htmlFor="vcard-email" className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="vcard-email"
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="contact@studio.np"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="vcard-web" className="block text-xs font-semibold text-slate-700 mb-1">
          Website
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Globe className="w-4 h-4" />
          </div>
          <input
            id="vcard-web"
            type="text"
            value={data.website}
            onChange={(e) => updateField('website', e.target.value)}
            placeholder="https://studio.np"
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label htmlFor="vcard-street" className="block text-xs font-semibold text-slate-700 mb-1">
            Street Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              id="vcard-street"
              type="text"
              value={data.street}
              onChange={(e) => updateField('street', e.target.value)}
              placeholder="Thamel Marg, Ward 26"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>
        </div>
        <div>
          <label htmlFor="vcard-city" className="block text-xs font-semibold text-slate-700 mb-1">
            City / Country
          </label>
          <input
            id="vcard-city"
            type="text"
            value={data.city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="Kathmandu, Nepal"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
          />
        </div>
      </div>

      <div>
        <label htmlFor="vcard-note" className="block text-xs font-semibold text-slate-700 mb-1">
          Note / Short Bio
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none text-slate-400">
            <FileText className="w-4 h-4" />
          </div>
          <input
            id="vcard-note"
            type="text"
            value={data.note}
            onChange={(e) => updateField('note', e.target.value)}
            placeholder="e.g. Available for freelance design & consultation"
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
          />
        </div>
      </div>

      {errorMessage && (
        <p className="text-xs font-medium text-rose-600 flex items-center gap-1.5 pt-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {errorMessage}
        </p>
      )}

      <p className="text-xs text-slate-500">
        When scanned, phones instantly prompt: <span className="font-semibold text-slate-700">"Add to Contacts"</span> with all these fields prefilled.
      </p>
    </div>
  );
};
