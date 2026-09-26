/**
 * Centralized Project Configuration for Rawaya Platform
 * Single source of truth for all contact details, WhatsApp, social links, and locations.
 */

export interface SiteConfig {
  name: string;
  nameArabic: string;
  tagline: string;
  description: string;
  phone: {
    raw: string; // E.g. '201000000000' for wa.me links
    formatted: string; // E.g. '+20 100 000 0000' for UI display
    tel: string; // 'tel:+201000000000'
  };
  whatsapp: {
    number: string; // E.g. '201000000000'
    defaultMessage: string;
    programMessageTemplate: (programTitle: string) => string;
  };
  email: string;
  location: {
    city: string;
    cityArabic: string;
    governorate: string;
    country: string;
    addressArabic: string;
    mapQuery: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    youtube?: string;
  };
  founder: {
    name: string;
    title: string;
    credentials: string[];
    experienceYears: number;
  };
  admin: {
    /**
     * SHA-256 hash of the admin PIN.
     * To change the PIN: compute SHA-256 of your new PIN and replace this value.
     * Example (PowerShell): [BitConverter]::ToString([SHA256]::Create().ComputeHash([Text.Encoding]::UTF8.GetBytes('NEW_PIN'))).Replace('-','').ToLower()
     */
    secretPinHash: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: 'Rawaya',
  nameArabic: 'رَوَايَا',
  tagline: 'رسالة ودراية',
  description:
    'مشروع ومنصة رَوَايَا التربوية بقيادة أ. نرمين الحسيني، خريجة الشريعة الإسلامية بالأزهر الشريف ومجازة بقراءة عاصم بروايتي شعبة وحفص من طريق الشاطبية. بناء جيل واعٍ يفهم دينه ويعيش بالقرآن.',
  phone: {
    raw: '201093769991',
    formatted: '+20 109 376 9991',
    tel: 'tel:+201093769991',
  },
  whatsapp: {
    number: '201093769991',
    defaultMessage:
      'السلام عليكم ورحمة الله، أود الاستفسار عن برامج وتفاصيل التسجيل في مشروع رَوَايَا لطفلي.',
    programMessageTemplate: (programTitle: string) =>
      `السلام عليكم ورحمة الله أ. نرمين الحسيني، أود الاستفسار عن تفاصيل وحجز مقعد لطفلي في «${programTitle}» ضمن مشروع رَوَايَا.`,
  },
  email: 'm.hosainy.law@gmail.com',
  location: {
    city: 'Mansoura',
    cityArabic: 'المنصورة',
    governorate: 'الدقهلية',
    country: 'مصر',
    addressArabic: 'المنصورة، محافظة الدقهلية، جمهورية مصر العربية (فصول حضورية وفصول تفاعلية عن بعد عبر زووم)',
    mapQuery: 'المنصورة, الدقهلية, مصر',
  },
  social: {
    // TODO: استبدل هذه الروابط بالروابط الفعلية لصفحات رَوَايَا عند إنشائها
    facebook: 'https://facebook.com', // ← ضع رابط صفحة فيسبوك هنا
    instagram: 'https://www.instagram.com/rawaya_24_9',
    telegram: 'https://t.me', // ← ضع رابط قناة تيليجرام هنا
    youtube: 'https://youtube.com', // ← ضع رابط قناة يوتيوب هنا
  },
  founder: {
    name: 'أ. نرمين الحسيني',
    title: 'باحثة ومربية شرعية ومؤسسة مشروع رَوَايَا',
    credentials: [
      'ليسانس الشريعة الإسلامية - كلية الدراسات الإسلامية والعربية بالأزهر الشريف',
      'إجازة بالسند المتصل إلى رسول الله ﷺ في قراءة عاصم بروايتي شعبة وحفص من الشاطبية',
      'إجازة متقدمة في تدريس منهج «نور البيان» لتعليم القراءة وترتيل القرآن',
      'خبرة ميدانية تتجاوز ١٣ عاماً في التربية الإيمانية للأطفال واليافعين',
    ],
    experienceYears: 13,
  },
  admin: {
    // SHA-256 of '123456' — to change: compute SHA-256 of your new PIN and replace
    secretPinHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
  },
};
