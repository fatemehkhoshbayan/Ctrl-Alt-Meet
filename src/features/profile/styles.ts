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
