export const HIGHLIGHT_ICON_OPTIONS = [
  { value: 'sparkles', label: 'Sparkles' },
  { value: 'code', label: 'Code' },
  { value: 'users', label: 'Users' },
  { value: 'star', label: 'Star' },
  { value: 'zap', label: 'Zap' },
  { value: 'mic', label: 'Mic' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'network', label: 'Network' },
];

export const HIGHLIGHT_ACCENT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
];

export const TIMEZONE_OPTIONS = [
  { value: 'PST', label: 'Pacific (PST)' },
  { value: 'MST', label: 'Mountain (MST)' },
  { value: 'CST', label: 'Central (CST)' },
  { value: 'EST', label: 'Eastern (EST)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'GMT', label: 'GMT' },
  { value: 'CET', label: 'Central European (CET)' },
  { value: 'IST', label: 'India (IST)' },
  { value: 'JST', label: 'Japan (JST)' },
  { value: 'AEST', label: 'Australia Eastern (AEST)' },
];

export function inputClass(hasError: boolean) {
  return [
    'bg-surface-container-high text-on-surface placeholder:text-on-surface-variant w-full rounded-md px-4 py-3 transition-all outline-none',
    'focus:border-primary focus:ring-primary border focus:ring-1',
    hasError ? 'border-red-400' : 'border-outline-variant',
  ].join(' ');
}

export function selectClass(hasError: boolean) {
  return [
    'bg-surface-container-high text-on-surface w-full cursor-pointer rounded-md border px-4 py-3 transition-all outline-none',
    'focus:border-primary focus:ring-primary focus:ring-1',
    hasError ? 'border-red-400' : 'border-outline-variant',
  ].join(' ');
}

export function textareaClass(hasError: boolean) {
  return [inputClass(hasError), 'min-h-32 resize-y'].join(' ');
}
