import React, { useState, useMemo, useRef } from 'react';
import {
  QRContentType,
  QRStylingConfig,
  UrlContentData,
  TextContentData,
  WifiContentData,
  VCardContentData,
  PhoneContentData,
  EmailContentData,
  SmsContentData,
  BusinessContentData,
} from './types';
import { generatePayload } from './utils/qrPayload';
import { Header } from './components/Header';
import { UrlForm } from './components/ContentForms/UrlForm';
import { TextForm } from './components/ContentForms/TextForm';
import { WifiForm } from './components/ContentForms/WifiForm';
import { VCardForm } from './components/ContentForms/VCardForm';
import { PhoneForm } from './components/ContentForms/PhoneForm';
import { EmailForm } from './components/ContentForms/EmailForm';
import { SmsForm } from './components/ContentForms/SmsForm';
import { BusinessForm } from './components/ContentForms/BusinessForm';
import { CustomizationPanel } from './components/CustomizationPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { BulkGenerator } from './components/BulkGenerator';
import { FaqSection } from './components/FaqSection';
import { HowItWorksModal } from './components/HowItWorksModal';
import { PrivacyModal } from './components/PrivacyModal';
import { Footer } from './components/Footer';
import {
  Globe,
  Type,
  Wifi,
  Contact2,
  Phone,
  Mail,
  MessageSquare,
  Store,
  Sparkles,
  Sliders,
  ShieldCheck,
  Zap,
  Printer,
  CheckCircle2,
  ArrowRight,
  Layers,
  QrCode,
} from 'lucide-react';

const DEFAULT_STYLING: QRStylingConfig = {
  foregroundColor: '#0f172a',
  backgroundColor: '#ffffff',
  transparentBackground: false,
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  errorCorrectionLevel: 'M',
  margin: 10,
  outputSize: 1024,
  logo: null,
};

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState<'studio' | 'bulk'>('studio');
  const [activeContentType, setActiveContentType] = useState<QRContentType>('url');
  const [studioSubTab, setStudioSubTab] = useState<'content' | 'design'>('content');

  // Modal states
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Form states initialized with realistic, friendly defaults
  const [urlData, setUrlData] = useState<UrlContentData>({
    url: 'https://codemitra.app',
  });
  const [textData, setTextData] = useState<TextContentData>({
    text: 'Welcome to CodeMitra! Free, private QR code generator.',
  });
  const [wifiData, setWifiData] = useState<WifiContentData>({
    ssid: 'Himalayan_Guest_Wifi',
    password: '',
    encryption: 'WPA',
    hidden: false,
  });
  const [vcardData, setVcardData] = useState<VCardContentData>({
    firstName: 'Aakash',
    lastName: 'Pathak',
    organization: 'CodeMitra',
    title: 'Developer & Owner',
    phone: '+977 9800000000',
    cell: '+977 9800000000',
    email: 'ramrajjnk75@gmail.com',
    website: 'https://codemitra.app',
    street: 'Janakpurdham',
    city: 'Janakpur',
    country: 'Nepal',
    note: 'Developer and Owner of CodeMitra',
  });
  const [phoneData, setPhoneData] = useState<PhoneContentData>({
    phoneNumber: '+977 9800000000',
  });
  const [emailData, setEmailData] = useState<EmailContentData>({
    email: 'ramrajjnk75@gmail.com',
    subject: 'Feedback on CodeMitra',
    body: 'Hi Aakash, I tried out CodeMitra and wanted to reach out!',
  });
  const [smsData, setSmsData] = useState<SmsContentData>({
    phoneNumber: '+977 9801234567',
    message: 'Hello! I scanned your QR code.',
  });
  const [businessData, setBusinessData] = useState<BusinessContentData>({
    businessName: 'Kathmandu Craft Coffee',
    tagline: 'Freshly roasted Himalayan beans',
    category: 'Specialty Cafe & Roastery',
    phone: '+977 1 4410000',
    email: 'info@ktmcraftcoffee.np',
    website: 'https://ktmcraftcoffee.np',
    address: 'Patan Durbar Square, Lalitpur, Nepal',
    hours: 'Sun-Fri: 7:00 AM - 8:30 PM',
    description: 'Single origin organic Arabica coffee and artisanal baked treats.',
    format: 'vcard',
  });

  // Customization styling state
  const [stylingConfig, setStylingConfig] = useState<QRStylingConfig>(DEFAULT_STYLING);

  // Compute live payload & validation
  const payloadResult = useMemo(() => {
    return generatePayload(activeContentType, {
      url: urlData,
      text: textData,
      wifi: wifiData,
      vcard: vcardData,
      phone: phoneData,
      email: emailData,
      sms: smsData,
      business: businessData,
    });
  }, [
    activeContentType,
    urlData,
    textData,
    wifiData,
    vcardData,
    phoneData,
    emailData,
    smsData,
    businessData,
  ]);

  const studioRef = useRef<HTMLDivElement>(null);

  const handleCreateQrClick = () => {
    setActiveNavTab('studio');
    studioRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRestoreSafeDefaults = () => {
    setStylingConfig(DEFAULT_STYLING);
  };

  const CONTENT_TYPE_TABS: Array<{
    id: QRContentType;
    label: string;
    icon: React.ElementType;
  }> = [
    { id: 'url', label: 'Website URL', icon: Globe },
    { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
    { id: 'vcard', label: 'Contact Card', icon: Contact2 },
    { id: 'business', label: 'Business Profile', icon: Store },
    { id: 'text', label: 'Plain Text', icon: Type },
    { id: 'phone', label: 'Call Phone', icon: Phone },
    { id: 'email', label: 'Send Email', icon: Mail },
    { id: 'sms', label: 'SMS Text', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        activeTab={activeNavTab}
        onTabChange={setActiveNavTab}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenFaq={() => {
          const faqEl = document.getElementById('faq-section');
          if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onCreateQrClick={handleCreateQrClick}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Client-Side In-Browser Generation • Zero Telemetry</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
              <span>Developed & Owned by</span>
              <strong className="text-slate-900 font-semibold">Aakash Pathak</strong>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Create QR Codes. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Share Anything.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Free, privacy-first QR code generator for shop owners, students, cafes, and creators. No accounts, no paywalls, no watermarks, and your data never leaves your browser.
          </p>

          {/* Quick Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
              Standard Static (No Expiry)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs font-medium">
              <Printer className="w-3.5 h-3.5 text-indigo-600" />
              Vector SVG & 2048px PNG
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs font-medium">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Bulk CSV Importer
            </span>
          </div>
        </div>

        {/* View Switcher: Studio vs Bulk */}
        {activeNavTab === 'bulk' ? (
          <BulkGenerator config={stylingConfig} />
        ) : (
          /* QR Design Studio Workspace */
          <div ref={studioRef} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Content Selection & Customization Studio (7 cols on lg) */}
              <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
                {/* Workspace Step Tabs: 1. Content Data vs 2. Styling & Logo */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setStudioSubTab('content')}
                      className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        studioSubTab === 'content'
                          ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      1. Content & Type
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudioSubTab('design')}
                      className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        studioSubTab === 'design'
                          ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      2. Design & Logo
                    </button>
                  </div>

                  <span className="hidden sm:inline-flex text-[11px] font-semibold text-slate-400">
                    Step {studioSubTab === 'content' ? '1 of 2' : '2 of 2'}
                  </span>
                </div>

                {/* Sub Tab 1: Content Type and Form */}
                {studioSubTab === 'content' ? (
                  <div className="space-y-6">
                    {/* Content Type Selector */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Select Content Format
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            document.getElementById('qr-preview-panel')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="lg:hidden text-[11px] text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-md font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <QrCode className="w-3 h-3" />
                          <span>Preview QR ↓</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CONTENT_TYPE_TABS.map((tab) => {
                          const Icon = tab.icon;
                          const isSelected = activeContentType === tab.id;
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setActiveContentType(tab.id)}
                              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex flex-col items-start gap-1.5 sm:gap-2 cursor-pointer ${
                                isSelected
                                  ? 'border-indigo-600 bg-indigo-50/40 text-indigo-900 ring-2 ring-indigo-100 shadow-2xs font-semibold'
                                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                              }`}
                            >
                              <span
                                className={`p-1.5 rounded-lg ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </span>
                              <span className="text-xs truncate w-full">{tab.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Active Form */}
                    <div className="pt-2">
                      {activeContentType === 'url' && (
                        <UrlForm
                          data={urlData}
                          onChange={setUrlData}
                          isValid={payloadResult.isValid}
                          errorMessage={payloadResult.errorMessage}
                        />
                      )}
                      {activeContentType === 'wifi' && (
                        <WifiForm
                          data={wifiData}
                          onChange={setWifiData}
                          isValid={payloadResult.isValid}
                          errorMessage={payloadResult.errorMessage}
                        />
                      )}
                      {activeContentType === 'vcard' && (
                        <VCardForm
                          data={vcardData}
                          onChange={setVcardData}
                          isValid={payloadResult.isValid}
                          errorMessage={payloadResult.errorMessage}
                        />
                      )}
                      {activeContentType === 'business' && (
                        <BusinessForm
                          data={businessData}
                          onChange={setBusinessData}
                          isValid={payloadResult.isValid}
                          errorMessage={payloadResult.errorMessage}
                        />
                      )}
                      {activeContentType === 'text' && (
                        <TextForm
                          data={textData}
                          onChange={setTextData}
                          isValid={payloadResult.isValid}
                          errorMessage={payloadResult.errorMessage}
                        />
                      )}
                      {activeContentType === 'phone' && (
                        <PhoneForm
                          data={phoneData}
                          onChange={setPhoneData}
                          isValid={payloadResult.isValid}
                          errorMessage={payloadResult.errorMessage}
                        />
                      )}
                      {activeContentType === 'email' && (
                        <EmailForm
                          data={emailData}
                          onChange={setEmailData}
                          isValid={payloadResult.isValid}
                          errorMessage={payloadResult.errorMessage}
                        />
                      )}
                      {activeContentType === 'sms' && (
                        <SmsForm
                          data={smsData}
                          onChange={setSmsData}
                          isValid={payloadResult.isValid}
                          errorMessage={payloadResult.errorMessage}
                        />
                      )}
                    </div>

                    {/* Next step prompt */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Content configured. Customize colors or center logos next.
                      </span>
                      <button
                        type="button"
                        onClick={() => setStudioSubTab('design')}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        Customize Design
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Sub Tab 2: Customization & Logo Panel */
                  <div className="space-y-6">
                    <CustomizationPanel
                      config={stylingConfig}
                      onChange={setStylingConfig}
                      onRestoreSafeDefaults={handleRestoreSafeDefaults}
                    />

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStudioSubTab('content')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        ← Back to Content
                      </button>
                      <button
                        type="button"
                        onClick={handleRestoreSafeDefaults}
                        className="text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        Reset design to black & white
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Live Preview & Export Pipeline (5 cols on lg) */}
              <div id="qr-preview-panel" className="lg:col-span-5 sticky top-20 scroll-mt-20">
                <PreviewPanel
                  payload={payloadResult.payload}
                  isValid={payloadResult.isValid}
                  errorMessage={payloadResult.errorMessage}
                  suggestedFilename={payloadResult.suggestedFilename}
                  config={stylingConfig}
                  onRestoreSafeDefaults={handleRestoreSafeDefaults}
                />
              </div>
            </div>
          </div>
        )}

        {/* Feature Highlights: Why CodeMitra */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Why use CodeMitra instead of traditional generators?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Most online QR tools lure you in, then redirect through their own domain and demand a monthly subscription after your flyers are printed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                100% Client-Side Privacy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your Wi-Fi passwords, contact addresses, and bulk client data are encoded locally inside your web browser. No databases, zero tracking, and no external API requests.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Truly Permanent Static Codes
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The payload is encoded directly into the pixel pattern. As long as your destination website, Wi-Fi router, or phone number stays active, the code will scan forever without any subscription.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Print-Ready Vector SVG & 2048px PNG
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download infinitely sharp vector SVG for large vinyl signboards, menus, and banners, or crisp 2048px PNG for digital displays and stickers.
              </p>
            </div>
          </div>
        </section>

        {/* Real-World Use Cases */}
        <section className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-2xl p-6 sm:p-10 shadow-lg space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Versatile & Practical
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 text-white">
              Built for Nepali local businesses & global creators
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Whether you run a momo cafe in Pokhara, an e-commerce shop, or organize university events, CodeMitra has you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <h4 className="font-bold text-sm text-white mb-1">
                Cafes & Restaurants
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instant digital menus and guest Wi-Fi QR cards on table tents.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <h4 className="font-bold text-sm text-white mb-1">
                Visiting & Business Cards
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                vCard contact QR code that opens "Add Contact" in iOS and Android.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <h4 className="font-bold text-sm text-white mb-1">
                Schools & Colleges
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bulk student ID card QR codes or event registration links.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <h4 className="font-bold text-sm text-white mb-1">
                Hotels & Homestays
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Room Wi-Fi credentials and local travel guide links for guests.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div id="faq-section">
          <FaqSection />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenFaq={() => {
          const faqEl = document.getElementById('faq-section');
          if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
