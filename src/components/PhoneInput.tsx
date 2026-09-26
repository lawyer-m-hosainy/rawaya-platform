import React, { useState } from 'react';
import { Phone, ChevronDown } from 'lucide-react';

export interface CountryCode {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

export const POPULAR_COUNTRIES: CountryCode[] = [
  { name: 'مصر', code: 'EG', dialCode: '+20', flag: '🇪🇬' },
  { name: 'السعودية', code: 'SA', dialCode: '+966', flag: '🇸🇦' },
  { name: 'الإمارات', code: 'AE', dialCode: '+971', flag: '🇦🇪' },
  { name: 'الكويت', code: 'KW', dialCode: '+965', flag: '🇰🇼' },
  { name: 'قطر', code: 'QA', dialCode: '+974', flag: '🇶🇦' },
  { name: 'عمان', code: 'OM', dialCode: '+968', flag: '🇴🇲' },
  { name: 'البحرين', code: 'BH', dialCode: '+973', flag: '🇧🇭' },
  { name: 'الأردن', code: 'JO', dialCode: '+962', flag: '🇯🇴' },
  { name: 'بريطانيا', code: 'GB', dialCode: '+44', flag: '🇬🇧' },
  { name: 'كندا / أمريكا', code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { name: 'ألمانيا', code: 'DE', dialCode: '+49', flag: '🇩🇪' },
  { name: 'أخرى', code: 'OTHER', dialCode: '', flag: '🌐' },
];

interface PhoneInputProps {
  value: string;
  onChange: (fullNumber: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  required = true,
  placeholder = '01012345678',
  className = '',
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(POPULAR_COUNTRIES[0]);
  const [localNumber, setLocalNumber] = useState<string>(() => {
    // If value already starts with dialCode, strip it
    if (value && value.startsWith(selectedCountry.dialCode)) {
      return value.replace(selectedCountry.dialCode, '').trim();
    }
    return value || '';
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const country = POPULAR_COUNTRIES.find((c) => c.code === code) || POPULAR_COUNTRIES[0];
    setSelectedCountry(country);
    const full = country.dialCode ? `${country.dialCode}${localNumber.replace(/^0+/, '')}` : localNumber;
    onChange(full);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, ''); // Numbers only
    setLocalNumber(val);
    const full = selectedCountry.dialCode ? `${selectedCountry.dialCode}${val.replace(/^0+/, '')}` : val;
    onChange(full);
  };

  return (
    <div className={`relative flex items-center rounded-xl border border-slate-300 bg-white focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all ${className}`} dir="ltr">
      
      {/* Country Selector */}
      <div className="relative border-r border-slate-200 bg-slate-50 rounded-l-xl px-2.5 py-2.5 flex items-center gap-1.5 shrink-0 text-xs font-semibold text-slate-700">
        <span>{selectedCountry.flag}</span>
        <span className="font-mono text-slate-800">{selectedCountry.dialCode}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />

        <select
          value={selectedCountry.code}
          onChange={handleCountryChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          aria-label="اختر مفتاح الدولة"
        >
          {POPULAR_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name} ({c.dialCode || 'مخصص'})
            </option>
          ))}
        </select>
      </div>

      {/* Number Input */}
      <div className="relative flex-1 flex items-center">
        <input
          type="tel"
          required={required}
          value={localNumber}
          onChange={handleNumberChange}
          placeholder={placeholder}
          className="w-full py-2.5 px-3 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden font-sans text-left"
          dir="ltr"
        />
        <Phone className="w-4 h-4 text-slate-400 mr-3 pointer-events-none shrink-0" />
      </div>

    </div>
  );
};
