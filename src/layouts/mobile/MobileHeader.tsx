import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { LogoWordMark } from '../Logo';
import { IconButton } from '@/ui';

interface IMobileHeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function MobileHeader({ theme, toggleTheme }: IMobileHeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="border-outline-variant/30 bg-surface-container sticky top-0 z-50 border-b shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex w-full items-center justify-between px-20 py-10">
        <LogoWordMark onClick={() => navigate('/')} size={60} />
        <div className="flex items-center gap-8">
          <IconButton
            icon={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
          />
          <div className="bg-primary text-headline-md text-on-primary flex h-12 w-12 items-center justify-center rounded-full font-bold">
            JD
          </div>
        </div>
      </nav>
    </header>
  );
}
