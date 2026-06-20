import { useNavigate } from 'react-router-dom';
import { Sun, Moon, User } from 'lucide-react';
import { LogoWordMark } from '../Logo';
import { IconButton } from '@/ui';
import { UserAvatar } from '@/shared';
import type { IUser } from '@/services';

interface IMobileHeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: IUser | null;
  onAvatarClick: () => void;
}

export default function MobileHeader({
  theme,
  toggleTheme,
  user,
  onAvatarClick,
}: IMobileHeaderProps) {
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
          <button
            type="button"
            onClick={onAvatarClick}
            aria-label={user ? `Signed in as ${user.name}` : 'Sign in'}
            className="flex items-center justify-center transition-opacity hover:opacity-90"
          >
            {user ? (
              <UserAvatar user={user} sizeClassName="h-12 w-12 text-headline-md" />
            ) : (
              <p className="bg-primary text-on-primary hover:bg-primary/90 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                <User size={24} />
              </p>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
