import type { ReactNode } from 'react';
import { Button } from '.';

interface ISearchBarProps {
  icon?: ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  buttonOnClick?: () => void;
}

export default function SearchBar({
  icon,
  placeholder,
  value,
  onChange,
  onKeyDown,
  buttonOnClick,
}: ISearchBarProps) {
  return (
    <div className="search-bar font-body text-body-md text-on-surface flex w-full max-w-2xl items-center rounded-full border px-4 py-2 duration-200">
      <div className="flex flex-1 items-center gap-3 px-6">
        {icon && <span className="text-primary flex items-center">{icon}</span>}
        <input
          className="placeholder:text-on-surface-variant w-full bg-transparent outline-none"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          onKeyDown={onKeyDown}
          type="text"
        />
      </div>
      <Button BtnText="Search" onClick={buttonOnClick ?? (() => {})} size="sm" />
    </div>
  );
}
