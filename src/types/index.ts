export type QRContentType =
  | 'url'
  | 'text'
  | 'wifi'
  | 'vcard'
  | 'phone'
  | 'email'
  | 'sms'
  | 'business';

export type DotPatternType =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerSquareType = 'square' | 'extra-rounded' | 'dot';

export type CornerDotType = 'square' | 'dot';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRStylingConfig {
  foregroundColor: string;
  backgroundColor: string;
  transparentBackground: boolean;
  dotType: DotPatternType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
  outputSize: number; // 256, 512, 1024, 2048
  logo: {
    url: string;
    size: number; // 0.15 to 0.35 of code size
    margin: number;
    name?: string;
  } | null;
}

export interface UrlContentData {
  url: string;
}

export interface TextContentData {
  text: string;
}

export interface WifiContentData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardContentData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  cell: string;
  email: string;
  website: string;
  street: string;
  city: string;
  country: string;
  note: string;
}

export interface PhoneContentData {
  phoneNumber: string;
}

export interface EmailContentData {
  email: string;
  subject: string;
  body: string;
}

export interface SmsContentData {
  phoneNumber: string;
  message: string;
}

export interface BusinessContentData {
  businessName: string;
  tagline: string;
  category: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  hours: string;
  description: string;
  format: 'vcard' | 'text';
}

export interface ContentPayloadResult {
  payload: string;
  isValid: boolean;
  errorMessage?: string;
  suggestedFilename: string;
}

export interface DesignPreset {
  id: string;
  name: string;
  description: string;
  foregroundColor: string;
  backgroundColor: string;
  dotType: DotPatternType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
}

export interface BulkRowItem {
  id: string;
  rowIndex: number;
  content: string;
  filename: string;
  isValid: boolean;
  errorMessage?: string;
  selected: boolean;
  generatedBlobUrl?: string;
}
