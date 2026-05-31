import { Button } from '.';

interface ISearchBarProps {
  icon?: string;
  placeholder?: string;
  buttonOnClick?: () => void;
}

export default function SearchBar({ icon, placeholder, buttonOnClick }: ISearchBarProps) {
  return (
    <div className="search-bar flex w-full max-w-2xl items-center rounded-full border px-4 py-2">
      <div className="flex flex-1 items-center gap-3 px-6">
        <span className="material-symbols-outlined text-primary">{icon}</span>
        <input
          className="font-body text-body-md text-on-surface placeholder:text-on-surface-variant w-full border-none bg-transparent focus:ring-0"
          placeholder={placeholder}
          type="text"
        />
      </div>
      <Button BtnText="Search" onClick={buttonOnClick ?? (() => {})} size="sm" />
    </div>
  );
}
