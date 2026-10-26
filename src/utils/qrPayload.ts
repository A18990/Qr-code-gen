import {
  QRContentType,
  UrlContentData,
  TextContentData,
  WifiContentData,
  VCardContentData,
  PhoneContentData,
  EmailContentData,
  SmsContentData,
  BusinessContentData,
  ContentPayloadResult,
} from '../types';

/**
 * Escapes special characters for Wi-Fi QR strings (RFC 7617/ZXing format):
 * Characters `\`, `;`, `,`, `:`, `"` must be escaped with a preceding backslash.
 */
function escapeWifiString(str: string): string {
  return str.replace(/([\\;,:"'])/g, '\\$1');
}

/**
 * Escapes special characters for vCard text fields (RFC 2426):
 * Characters `;`, `,`, `\` and newlines
 */
function escapeVCard(str: string): string {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * Sanitize strings for use in file names
 */
export function sanitizeFilename(str: string, fallback = 'codemitra-qr'): string {
  const cleaned = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return cleaned || fallback;
}

export function buildUrlPayload(data: UrlContentData): ContentPayloadResult {
  const trimmed = data.url.trim();
  if (!trimmed) {
    return {
      payload: '',
      isValid: false,
      errorMessage: 'Please enter a website URL.',
      suggestedFilename: 'codemitra-url-qr',
    };
  }

  // URL format validation
  let parsedUrl: URL;
  try {
    // If user forgot protocol, hint or validate
    if (!/^https?:\/\//i.test(trimmed)) {
      parsedUrl = new URL(`https://${trimmed}`);
    } else {
      parsedUrl = new URL(trimmed);
    }
  } catch {
    return {
      payload: trimmed,
      isValid: false,
      errorMessage: 'Please enter a valid website address (e.g. https://example.com).',
      suggestedFilename: 'codemitra-url-qr',
    };
  }

  const hostname = parsedUrl.hostname.replace(/^www\./i, '');
  const slug = sanitizeFilename(hostname, 'website');

  return {
    payload: parsedUrl.href,
    isValid: true,
    suggestedFilename: `codemitra-${slug}-qr`,
  };
}

export function buildTextPayload(data: TextContentData): ContentPayloadResult {
  const trimmed = data.text.trim();
  if (!trimmed) {
    return {
      payload: '',
      isValid: false,
      errorMessage: 'Please enter plain text or message.',
      suggestedFilename: 'codemitra-text-qr',
    };
  }

  const snippet = trimmed.slice(0, 15);
  const slug = sanitizeFilename(snippet, 'text');

  return {
    payload: data.text,
    isValid: true,
    suggestedFilename: `codemitra-${slug}-qr`,
  };
}

export function buildWifiPayload(data: WifiContentData): ContentPayloadResult {
  const ssid = data.ssid.trim();
  if (!ssid) {
    return {
      payload: '',
      isValid: false,
      errorMessage: 'Wi-Fi Network Name (SSID) is required.',
      suggestedFilename: 'codemitra-wifi-qr',
    };
  }

  if (data.encryption !== 'nopass' && !data.password) {
    return {
      payload: '',
      isValid: false,
      errorMessage: 'Password is required for encrypted Wi-Fi networks.',
      suggestedFilename: `codemitra-wifi-${sanitizeFilename(ssid)}-qr`,
    };
  }

  const escapedSsid = escapeWifiString(ssid);
  const escapedPassword = escapeWifiString(data.password);
  const hiddenFlag = data.hidden ? 'true' : 'false';

  // Standard ZXing format: WIFI:T:WPA;S:MySSID;P:MyPassword;H:false;;
  let payload = `WIFI:S:${escapedSsid};`;
  payload += `T:${data.encryption};`;
  if (data.encryption !== 'nopass') {
    payload += `P:${escapedPassword};`;
  }
  if (data.hidden) {
    payload += `H:${hiddenFlag};`;
  }
  payload += ';';

  return {
    payload,
    isValid: true,
    suggestedFilename: `codemitra-wifi-${sanitizeFilename(ssid)}-qr`,
  };
}

export function buildVCardPayload(data: VCardContentData): ContentPayloadResult {
  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const phone = data.phone.trim() || data.cell.trim();

  if (!firstName && !lastName && !data.organization.trim()) {
    return {
      payload: '',
      isValid: false,
      errorMessage: 'At least a name or organization is required for contact card.',
      suggestedFilename: 'codemitra-vcard-qr',
    };
  }

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || data.organization.trim();
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`,
    `FN:${escapeVCard(fullName)}`,
  ];

  if (data.organization.trim()) {
    lines.push(`ORG:${escapeVCard(data.organization.trim())}`);
  }
  if (data.title.trim()) {
    lines.push(`TITLE:${escapeVCard(data.title.trim())}`);
  }
  if (data.phone.trim()) {
    lines.push(`TEL;TYPE=WORK,VOICE:${escapeVCard(data.phone.trim())}`);
  }
  if (data.cell.trim()) {
    lines.push(`TEL;TYPE=CELL,VOICE:${escapeVCard(data.cell.trim())}`);
  }
  if (data.email.trim()) {
    lines.push(`EMAIL;TYPE=PREF,INTERNET:${escapeVCard(data.email.trim())}`);
  }
  if (data.website.trim()) {
    let site = data.website.trim();
    if (!/^https?:\/\//i.test(site)) {
      site = `https://${site}`;
    }
    lines.push(`URL:${escapeVCard(site)}`);
  }
  if (data.street.trim() || data.city.trim() || data.country.trim()) {
    // ADR format: ;;street;city;region;postal;country
    lines.push(
      `ADR;TYPE=WORK:;;${escapeVCard(data.street.trim())};${escapeVCard(data.city.trim())};;${escapeVCard(data.country.trim())}`
    );
  }
  if (data.note.trim()) {
    lines.push(`NOTE:${escapeVCard(data.note.trim())}`);
  }

  lines.push('END:VCARD');

  return {
    payload: lines.join('\n'),
    isValid: true,
    suggestedFilename: `codemitra-contact-${sanitizeFilename(fullName)}-qr`,
  };
}

export function buildPhonePayload(data: PhoneContentData): ContentPayloadResult {
  const rawNumber = data.phoneNumber.trim();
  if (!rawNumber) {
    return {
      payload: '',
      isValid: false,
      errorMessage: 'Please enter a telephone number.',
      suggestedFilename: 'codemitra-call-qr',
    };
  }

  // Ensure standard tel format
  const cleanNumber = rawNumber.replace(/[^0-9+*#]/g, '');
  if (!cleanNumber) {
    return {
      payload: '',
      isValid: false,
      errorMessage: 'Please enter valid numbers or digits.',
      suggestedFilename: 'codemitra-call-qr',
    };
  }

  return {
    payload: `tel:${cleanNumber}`,
    isValid: true,
    suggestedFilename: `codemitra-call-${sanitizeFilename(cleanNumber)}-qr`,
  };
}

export function buildEmailPayload(data: EmailContentData): ContentPayloadResult {
  const email = data.email.trim();
  if (!email) {
    return {
      payload: '',
      isValid: false,
      errorMessage: 'Please enter a recipient email address.',
      suggestedFilename: 'codemitra-email-qr',
    };
  }

  // Basic email pattern check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      payload: `mailto:${email}`,
      isValid: false,
      errorMessage: 'Please enter a valid email address (e.g. name@domain.com).',
      suggestedFilename: 'codemitra-email-qr',
    };
  }

  const params = new URLSearchParams();
  if (data.subject.trim()) params.set('subject', data.subject.trim());
  if (data.body.trim()) params.set('body', data.body.trim());

  const queryString = params.toString();
  const payload = queryString ? `mailto:${email}?${queryString}` : `mailto:${email}`;

  return {
    payload,
    isValid: true,
    suggestedFilename: `codemitra-email-${sanitizeFilename(email.split('@')[0])}-qr`,
  };
}

export function buildSmsPayload(data: SmsContentData): ContentPayloadResult {
  const phone = data.phoneNumber.trim();
  if (!phone) {
    return {
      payload: '',
      isValid: false,
      errorMessage: 'Phone number for SMS is required.',
      suggestedFilename: 'codemitra-sms-qr',
    };
  }

  const cleanNumber = phone.replace(/[^0-9+*#]/g, '');
  const params = new URLSearchParams();
  if (data.message.trim()) {
    params.set('body', data.message.trim());
  }

  const queryString = params.toString();
  const payload = queryString ? `sms:${cleanNumber}?${queryString}` : `sms:${cleanNumber}`;

  return {
    payload,
    isValid: true,
    suggestedFilename: `codemitra-sms-${sanitizeFilename(cleanNumber)}-qr`,
  };
}

export function buildBusinessPayload(data: BusinessContentData): ContentPayloadResult {
  const name = data.businessName.trim();
  if (!name) {
    return {
      payload: '',
      isValid: false,
      errorMessage: 'Business or Shop name is required.',
      suggestedFilename: 'codemitra-business-qr',
    };
  }

  if (data.format === 'vcard') {
    // Generate business vCard
    const lines: string[] = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${escapeVCard(name)}`,
      `ORG:${escapeVCard(name)}`,
    ];

    if (data.category.trim()) {
      lines.push(`TITLE:${escapeVCard(data.category.trim())}`);
    }
    if (data.phone.trim()) {
      lines.push(`TEL;TYPE=WORK,VOICE:${escapeVCard(data.phone.trim())}`);
    }
    if (data.email.trim()) {
      lines.push(`EMAIL;TYPE=INTERNET:${escapeVCard(data.email.trim())}`);
    }
    if (data.website.trim()) {
      let site = data.website.trim();
      if (!/^https?:\/\//i.test(site)) site = `https://${site}`;
      lines.push(`URL:${escapeVCard(site)}`);
    }
    if (data.address.trim()) {
      lines.push(`ADR;TYPE=WORK:;;${escapeVCard(data.address.trim())};;;;`);
    }

    const noteParts: string[] = [];
    if (data.tagline.trim()) noteParts.push(data.tagline.trim());
    if (data.hours.trim()) noteParts.push(`Hours: ${data.hours.trim()}`);
    if (data.description.trim()) noteParts.push(data.description.trim());
    if (noteParts.length > 0) {
      lines.push(`NOTE:${escapeVCard(noteParts.join(' | '))}`);
    }

    lines.push('END:VCARD');

    return {
      payload: lines.join('\n'),
      isValid: true,
      suggestedFilename: `codemitra-${sanitizeFilename(name)}-qr`,
    };
  } else {
    // Plain text business card representation
    const textLines: string[] = [name.toUpperCase()];
    if (data.tagline.trim()) textLines.push(`"${data.tagline.trim()}"`);
    if (data.category.trim()) textLines.push(`Category: ${data.category.trim()}`);
    if (data.phone.trim()) textLines.push(`Phone: ${data.phone.trim()}`);
    if (data.email.trim()) textLines.push(`Email: ${data.email.trim()}`);
    if (data.website.trim()) textLines.push(`Web: ${data.website.trim()}`);
    if (data.address.trim()) textLines.push(`Address: ${data.address.trim()}`);
    if (data.hours.trim()) textLines.push(`Hours: ${data.hours.trim()}`);
    if (data.description.trim()) textLines.push(`\n${data.description.trim()}`);

    return {
      payload: textLines.join('\n'),
      isValid: true,
      suggestedFilename: `codemitra-${sanitizeFilename(name)}-qr`,
    };
  }
}

export function generatePayload(
  type: QRContentType,
  state: {
    url: UrlContentData;
    text: TextContentData;
    wifi: WifiContentData;
    vcard: VCardContentData;
    phone: PhoneContentData;
    email: EmailContentData;
    sms: SmsContentData;
    business: BusinessContentData;
  }
): ContentPayloadResult {
  switch (type) {
    case 'url':
      return buildUrlPayload(state.url);
    case 'text':
      return buildTextPayload(state.text);
    case 'wifi':
      return buildWifiPayload(state.wifi);
    case 'vcard':
      return buildVCardPayload(state.vcard);
    case 'phone':
      return buildPhonePayload(state.phone);
    case 'email':
      return buildEmailPayload(state.email);
    case 'sms':
      return buildSmsPayload(state.sms);
    case 'business':
      return buildBusinessPayload(state.business);
    default:
      return {
        payload: '',
        isValid: false,
        errorMessage: 'Unknown content type',
        suggestedFilename: 'codemitra-qr',
      };
  }
}
