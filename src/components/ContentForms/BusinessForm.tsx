import React from 'react';
import { BusinessContentData } from '../../types';
import { Store, Phone, Mail, Globe, MapPin, Clock, Info, AlertCircle } from 'lucide-react';

interface BusinessFormProps {
  data: BusinessContentData;
  onChange: (data: BusinessContentData) => void;
  isValid: boolean;
  errorMessage?: string;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({
  data,
  onChange,
  isValid,
  errorMessage,
}) => {
  const updateField = (field: keyof BusinessContentData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* Format Toggle */}
      <div className="p-1 bg-slate-100 rounded-xl flex text-xs font-medium">
        <button
          type="button"
          onClick={() => onChange({ ...data, format: 'vcard' })}
          className={`flex-1 py-2 rounded-lg transition-all ${
            data.format === 'vcard'
              ? 'bg-white text-indigo-700 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Contact Card Format (vCard)
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...data, format: 'text' })}
          className={`flex-1 py-2 rounded-lg transition-all ${
            data.format === 'text'
              ? 'bg-white text-indigo-700 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Readable Text Summary
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="biz-name" className="block text-xs font-semibold text-slate-700 mb-1">
            Business / Shop Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Store className="w-4 h-4" />
            </div>
            <input
              id="biz-name"
              type="text"
              value={data.businessName}
              onChange={(e) => updateField('businessName', e.target.value)}
              placeholder="e.g. Kathmandu Coffee Roasters"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="biz-category" className="block text-xs font-semibold text-slate-700 mb-1">
            Category or Tagline
          </label>
          <input
            id="biz-category"
            type="text"
            value={data.category}
            onChange={(e) => updateField('category', e.target.value)}
            placeholder="Artisanal Cafe & Bakery"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="biz-phone" className="block text-xs font-semibold text-slate-700 mb-1">
            Business Phone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="biz-phone"
              type="tel"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+977 1 4410000"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 font-mono"
            />
          </div>
        </div>

        <div>
          <label htmlFor="biz-email" className="block text-xs font-semibold text-slate-700 mb-1">
            Business Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="biz-email"
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="hello@ktmcoffee.np"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="biz-web" className="block text-xs font-semibold text-slate-700 mb-1">
            Website or Order Page
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Globe className="w-4 h-4" />
            </div>
            <input
              id="biz-web"
              type="text"
              value={data.website}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="https://ktmcoffee.np"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="biz-hours" className="block text-xs font-semibold text-slate-700 mb-1">
            Opening Hours
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Clock className="w-4 h-4" />
            </div>
            <input
              id="biz-hours"
              type="text"
              value={data.hours}
              onChange={(e) => updateField('hours', e.target.value)}
              placeholder="Mon-Sat: 7:00 AM - 9:00 PM"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="biz-address" className="block text-xs font-semibold text-slate-700 mb-1">
          Store Address / Landmark
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <MapPin className="w-4 h-4" />
          </div>
          <input
            id="biz-address"
            type="text"
            value={data.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Patan Durbar Square, Lalitpur, Nepal"
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
          />
        </div>
      </div>

      <div>
        <label htmlFor="biz-desc" className="block text-xs font-semibold text-slate-700 mb-1">
          Short Description (Optional)
        </label>
        <textarea
          id="biz-desc"
          rows={2}
          value={data.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Specialty single-origin Himalayan coffee beans, fresh pastries & outdoor garden."
          className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 resize-y"
        />
      </div>

      {errorMessage && (
        <p className="text-xs font-medium text-rose-600 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {errorMessage}
        </p>
      )}

      {/* Direct Information Clarification */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5 leading-relaxed">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">Static encoding notice:</span> This QR code embeds this business information directly into the barcode. It does not create an editable online hosted profile or server database entry, which means it will always work offline without subscriptions.
        </div>
      </div>
    </div>
  );
};
