import React from 'react';
import { X, CheckCircle, ShieldCheck, Printer, Zap, Sparkles, HelpCircle } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-it-works-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
              <HelpCircle className="w-4 h-4" />
            </span>
            <h2 id="how-it-works-title" className="text-base font-bold text-slate-900">
              How CodeMitra Works
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

        <div className="p-6 space-y-6 text-sm text-slate-600 max-h-[75vh] overflow-y-auto">
          {/* Step flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-2.5">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-xs mb-1">
                Choose Content Type
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Enter your website URL, Wi-Fi network credentials, contact vCard, phone number, or business card.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-2.5">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-xs mb-1">
                Style & Add Logo
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Select custom colors, eye shapes, or place your company/cafe logo directly in the center with automated error correction.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-2.5">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-xs mb-1">
                Export Vector or PNG
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Download infinitely scalable vector SVG for commercial printing or high-resolution PNG (up to 2048px).
              </p>
            </div>
          </div>

          {/* The Truth About Static QR Codes */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <h4 className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              Do these QR codes ever expire?
            </h4>
            <p className="text-xs text-amber-900 leading-relaxed">
              Unlike predatory tools that redirect through their own paywalled servers and expire after 14 days, <strong>CodeMitra creates standard static QR codes</strong>.
            </p>
            <p className="text-xs text-amber-900 leading-relaxed">
              The data is directly encoded into the black-and-white pixel matrix. As long as your destination link, Wi-Fi password, or phone number remains active, your printed QR codes will work indefinitely without any subscription.
            </p>
          </div>

          {/* Print & Quality Checklist */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Printer className="w-4 h-4 text-indigo-600" />
              Recommendations for Print & Signage
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Minimum physical size:</strong> Print at least 2 × 2 cm (0.8 × 0.8 in) for menus and business cards, and 10 × 10 cm for storefront posters.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Keep a quiet margin:</strong> Never crop right to the edge of the dots. Phone sensors need clear space (quiet zone) around the corners to lock focus.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Test before printing in bulk:</strong> Always scan the printed proof with at least two different smartphones (e.g. an iPhone and an Android) under natural light.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
