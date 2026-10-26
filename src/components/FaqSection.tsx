import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Do these QR codes expire or have scan limits?',
    answer:
      'No. CodeMitra generates standard static QR codes. The encoded text, URL, Wi-Fi configuration, or vCard is permanently embedded into the visual pattern itself. There are no scan limits, paywalls, or artificial countdown timers. As long as your destination link or Wi-Fi password remains valid, the QR code will scan reliably forever.',
  },
  {
    question: 'Is my data, Wi-Fi password, or CSV uploaded to a server?',
    answer:
      'Never. The entire encoding engine, logo merger, and ZIP compression pipeline run 100% locally in your web browser using HTML5 Canvas and JavaScript. No passwords, contact details, or spreadsheet rows are ever transmitted across the internet.',
  },
  {
    question: 'Should I download PNG or SVG?',
    answer:
      'For websites, emails, and social media, high-resolution PNG (1024px or 2048px) is ideal. For professional printing, vinyl shop signboards, cafe table stands, and large banners, download SVG (Scalable Vector Graphics). SVG can be enlarged infinitely without pixelation or loss of crispness.',
  },
  {
    question: 'What is Error Correction Level (L, M, Q, H)?',
    answer:
      'QR codes use Reed-Solomon mathematical error correction to remain readable even if partially smudged, torn, or covered. Level L recovers 7% of data, M recovers 15%, Q recovers 25%, and H recovers up to 30%. When you add a center logo, CodeMitra automatically sets this to High (H) so camera scanners can read around the graphic.',
  },
  {
    question: 'Can I use these QR codes for commercial and business purposes?',
    answer:
      'Yes, 100%. All QR codes you create with CodeMitra are free for both personal and commercial use—including restaurant menus, hotel Wi-Fi cards, packaging, promotional posters, product tags, and visiting cards.',
  },
  {
    question: 'How do I generate QR codes in bulk from Excel or Google Sheets?',
    answer:
      'Click the "Bulk QR Codes" tab at the top. Save your spreadsheet as a .CSV file, upload it, and select which column contains your links or Wi-Fi strings. CodeMitra will generate every QR code in seconds and package them into an organized ZIP archive with an audit manifest.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
          <HelpCircle className="w-5 h-5" />
        </span>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>
      <p className="text-xs text-slate-500 mb-6 max-w-xl">
        Clear, honest answers about static QR mechanics, print safety, and privacy guarantees.
      </p>

      <div className="divide-y divide-slate-100">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-3.5">
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-800 hover:text-indigo-600 transition-colors py-1 cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-2 text-xs text-slate-600 leading-relaxed pr-6 animate-in fade-in duration-150">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
