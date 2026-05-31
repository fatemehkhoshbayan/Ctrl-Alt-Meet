import { cn } from '@/lib';

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label?: string;
  className?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChangeOption: (value: string) => void;
}

export default function Select({ id, label, className, options, value, onChangeOption }: ISelectProps) {
  return (
    <div className={cn('gap-stack-gap flex items-center', className)}>
      {label && (
        <label htmlFor={id} className="font-label-md text-label-md text-on-surface-variant">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        className="text-on-surface cursor-pointer border-none bg-transparent font-bold focus:ring-0"
        onChange={e => onChangeOption(e.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
