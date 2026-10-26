import React from 'react';
import { ShieldCheck, Sparkles, Layers, QrCode } from 'lucide-react';

interface HeaderProps {
  activeTab: 'studio' | 'bulk';
  onTabChange: (tab: 'studio' | 'bulk') => void;
  onOpenHowItWorks: () => void;
  onOpenFaq: () => void;
  onOpenPrivacy: () => void;
  onCreateQrClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenHowItWorks,
  onOpenFaq,
  onOpenPrivacy,
  onCreateQrClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onTabChange('studio')}
              className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Code<span className="text-indigo-600">Mitra</span>
                  </span>
                  <span className="hidden xs:inline-block px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase tracking-wider border border-indigo-100">
                    Free
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 hidden md:block">
                  By <strong className="text-slate-600 font-semibold">Aakash Pathak</strong>
                </span>
              </div>
            </button>

            {/* Desktop Navigation Switcher */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 text-xs font-semibold">
              <button
                type="button"
                onClick={() => onTabChange('studio')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'studio'
                    ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                QR Studio
              </button>
              <button
                type="button"
                onClick={() => onTabChange('bulk')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'bulk'
                    ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Bulk QR
              </button>
            </nav>
          </div>

          {/* Right Hand Actions - Fully responsive & fitting on all mobile widths */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenHowItWorks}
              className="hidden lg:inline-flex px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Guide
            </button>
            <button
              type="button"
              onClick={onOpenFaq}
              className="hidden lg:inline-flex px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              FAQ
            </button>

            {/* Local Engine badge */}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/60 rounded-xl transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Local</span>
            </button>

            {/* Mobile Tab Switcher - Studio vs Bulk */}
            <div className="flex md:hidden bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => onTabChange('studio')}
                className={`px-2 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                  activeTab === 'studio'
                    ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Studio
              </button>
              <button
                type="button"
                onClick={() => onTabChange('bulk')}
                className={`px-2 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                  activeTab === 'bulk'
                    ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bulk
              </button>
            </div>

            {/* Action CTA: Compact on mobile, full on tablet/desktop */}
            <button
              type="button"
              onClick={onCreateQrClick}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 rounded-lg sm:rounded-xl shadow-xs transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer shrink-0"
              title="Create QR Code"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Create QR</span>
              <span className="xs:hidden">New</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
