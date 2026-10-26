import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, Server, HardDrive, Check } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h2 id="privacy-policy-title" className="text-base font-bold text-slate-900">
              Privacy & Local Processing Guarantee
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs text-slate-600 max-h-[75vh] overflow-y-auto leading-relaxed">
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-950 font-medium">
            CodeMitra was built specifically to solve the data leakage problem in free QR generators. We believe that your Wi-Fi passwords, private customer lists, and contact numbers should never sit on an unknown third-party server.
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                <HardDrive className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-0.5">
                  1. Local Browser Computation
                </h3>
                <p>
                  Every QR code matrix is calculated directly by your device's browser using JavaScript and HTML5 Canvas / SVG vector math. Whether you generate a single Wi-Fi QR code or parse a 5,000-row bulk CSV spreadsheet, all calculations remain isolated in your computer or phone's local memory.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                <EyeOff className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-0.5">
                  2. No Content Logging or Analytics
                </h3>
                <p>
                  We do not transmit your QR contents, URLs, passwords, or contact details to any application backend, database, or analytics collector. We do not use third-party behavioral trackers or tracking cookies.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-0.5">
                  3. Client-Side Image & CSV Processing
                </h3>
                <p>
                  When you upload a custom logo or import a CSV file for batch generation, the file is read using the browser's native File and FileReader APIs (via in-memory Object URLs). Once your session finishes or you refresh, that data is flushed from memory.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-0.5">
                  4. Hosting Infrastructure
                </h3>
                <p>
                  Like any website hosted on standard web infrastructure (such as Cloudflare, Netlify, or Google Cloud Run), the hosting network provider automatically receives routine technical metadata (such as IP address and browser User-Agent header) to serve static assets and prevent DDoS attacks. No payload content is ever logged.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
