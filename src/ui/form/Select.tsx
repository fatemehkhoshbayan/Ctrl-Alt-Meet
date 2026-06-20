import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib';

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label?: string;
  className?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChangeOption: (value: string) => void;
}

export default function Select({
  id,
  label,
  className,
  options,
  value,
  onChangeOption,
}: ISelectProps) {
  return (
    <div className={cn('gap-stack-gap flex items-center', className)}>
      {label && (
        <label
          htmlFor={id}
          className="font-label-md text-label-md text-on-surface-variant shrink-0"
        >
          {label}
        </label>
      )}
      <div className="relative min-w-0 flex-1">
        <select
          id={id}
          value={value}
          className="text-on-surface-variant w-full cursor-pointer appearance-none border-none bg-transparent py-0 pr-8 pl-0 outline-none"
          onChange={e => onChangeOption(e.target.value)}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden
          className="text-on-surface-variant pointer-events-none absolute top-1/2 right-0 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
