import { NavLink, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { NAV_LINKS } from '../constant';
import { LogoWordMark } from '../Logo';
import { IconButton } from '@/ui';

interface IDesktopHeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function DesktopHeader({ theme, toggleTheme }: IDesktopHeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="border-outline-variant/30 bg-surface-container sticky top-0 z-50 border-b shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-10 py-6">
        <LogoWordMark onClick={() => navigate('/')} />

        <div className="flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              className={({ isActive }) =>
                `font-display text-headline-md font-bold tracking-tight ${isActive ? 'text-primary underline' : 'text-on-surface'}`
              }
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        {/* TODO: Add user profile */}
        <div className="flex items-center gap-4">
          <IconButton
            icon={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
          />
          <div className="bg-primary text-on-primary flex h-10 w-10 items-center justify-center rounded-full font-bold">
            AK
          </div>
        </div>
      </nav>
    </header>
  );
}
