import { NavLink, useNavigate } from 'react-router-dom';
import { Sun, Moon, User } from 'lucide-react';
import { NAV_LINKS } from '../constant';
import { LogoWordMark } from '../Logo';
import { IconButton } from '@/ui';
import { UserAvatar } from '@/shared';
import type { IUser } from '@/services';

interface IDesktopHeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: IUser | null;
  onAvatarClick: () => void;
}

export default function DesktopHeader({
  theme,
  toggleTheme,
  user,
  onAvatarClick,
}: IDesktopHeaderProps) {
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
        <div className="flex items-center gap-4">
          <IconButton
            icon={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
          />
          <button
            type="button"
            onClick={onAvatarClick}
            aria-label={user ? `Signed in as ${user.name}` : 'Sign in'}
            className="flex items-center justify-center transition-opacity hover:opacity-90"
          >
            {user ? (
              <UserAvatar user={user} />
            ) : (
              <p className="bg-primary text-on-primary hover:bg-primary/90 flex h-10 w-10 items-center justify-center rounded-full transition-colors">
                <User size={20} />
              </p>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
