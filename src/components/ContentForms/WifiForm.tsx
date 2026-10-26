import React, { useState } from 'react';
import { WifiContentData } from '../../types';
import { Wifi, Eye, EyeOff, ShieldAlert, Lock, Info } from 'lucide-react';

interface WifiFormProps {
  data: WifiContentData;
  onChange: (data: WifiContentData) => void;
  isValid: boolean;
  errorMessage?: string;
}

export const WifiForm: React.FC<WifiFormProps> = ({
  data,
  onChange,
  isValid,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      {/* SSID */}
      <div>
        <label htmlFor="wifi-ssid" className="block text-sm font-semibold text-slate-800 mb-1.5">
          Network Name (SSID) <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Wifi className="w-5 h-5" />
          </div>
          <input
            id="wifi-ssid"
            type="text"
            value={data.ssid}
            onChange={(e) => onChange({ ...data, ssid: e.target.value })}
            placeholder="e.g. Kathmandu_Cafe_5G or Himalayan_Lodge"
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all"
          />
        </div>
      </div>

      {/* Security Type */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-1.5">
          Security Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['WPA', 'WEP', 'nopass'] as const).map((enc) => (
            <button
              key={enc}
              type="button"
              onClick={() => onChange({ ...data, encryption: enc })}
              className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                data.encryption === enc
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-semibold shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {enc === 'WPA' ? 'WPA / WPA2 / WPA3' : enc === 'WEP' ? 'WEP (Legacy)' : 'No Password (Open)'}
            </button>
          ))}
        </div>
      </div>

      {/* Password (if not open) */}
      {data.encryption !== 'nopass' && (
        <div>
          <label htmlFor="wifi-password" className="block text-sm font-semibold text-slate-800 mb-1.5">
            Network Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              id="wifi-password"
              type={showPassword ? 'text' : 'password'}
              value={data.password}
              onChange={(e) => onChange({ ...data, password: e.target.value })}
              placeholder="Enter exact Wi-Fi password"
              autoComplete="new-password"
              className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}

      {/* Hidden Network Toggle */}
      <div className="flex items-center gap-3 pt-1">
        <input
          id="wifi-hidden"
          type="checkbox"
          checked={data.hidden}
          onChange={(e) => onChange({ ...data, hidden: e.target.checked })}
          className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
        />
        <label htmlFor="wifi-hidden" className="text-xs font-medium text-slate-700 cursor-pointer select-none">
          This is a hidden network (SSID is not broadcasted)
        </label>
      </div>

      {errorMessage && data.ssid && (
        <p className="text-xs font-medium text-rose-600 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
          {errorMessage}
        </p>
      )}

      {/* Security & Privacy Notice */}
      <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-950">Privacy note:</span> Credentials are encoded directly into the QR pattern inside your browser and are never sent to any server. Keep in mind that anyone with a camera scanner can connect to this network and may view the encoded password.
        </div>
      </div>
    </div>
  );
};
