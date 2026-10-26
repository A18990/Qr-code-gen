import React from 'react';
import { QrCode, ShieldCheck, Heart, Sparkles, Mail } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenHowItWorks: () => void;
  onOpenFaq: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenHowItWorks,
  onOpenFaq,
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-2xs">
                <QrCode className="w-4 h-4" />
              </div>
              <span className="text-base font-black tracking-tight text-slate-900">
                Code<span className="text-indigo-600">Mitra</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              A high-precision, privacy-first QR code engine built for shop owners, students, creators, schools, and developers. Free forever, no watermark, and zero data leaves your device.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Client-Side In-Browser Computation
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Product & Guides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  QR Generator Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenHowItWorks}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  How It Works & Print Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenFaq}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <span className="text-slate-400">
                  Bulk CSV Import (Active)
                </span>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Developer & Owner
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-700 font-medium">
                  Developed & Owned by <strong className="text-slate-900">Aakash Pathak</strong>
                </span>
              </li>
              <li>
                <a
                  href="mailto:ramrajjnk75@gmail.com"
                  className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  ramrajjnk75@gmail.com
                </a>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-500"
                >
                  Privacy Policy & Data Ethics
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} CodeMitra. Developed and owned by <strong className="font-semibold text-slate-700">Aakash Pathak</strong> for Nepal and creators worldwide.
          </div>
          <div className="flex items-center gap-1">
            <span>Client-side engine</span>
            <span>•</span>
            <span>Zero tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
