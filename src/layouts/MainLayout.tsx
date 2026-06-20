import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useAuth, useMediaQuery, useTheme } from '@/hooks';
import { DesktopHeader, DesktopFooter } from './desktop';
import { MobileFooter, MobileHeader, MobileBottomNav } from './mobile';

export default function MainLayout() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleAvatarClick = () => {
    navigate(user ? '/profile' : '/login');
  };

  return (
    <>
      {isDesktop ? (
        <DesktopHeader
          theme={theme}
          toggleTheme={toggleTheme}
          user={user}
          onAvatarClick={handleAvatarClick}
        />
      ) : (
        <MobileHeader
          theme={theme}
          toggleTheme={toggleTheme}
          user={user}
          onAvatarClick={handleAvatarClick}
        />
      )}
      <main
        className={`bg-background text-on-surface flex min-w-[80%] flex-col items-center justify-center ${!isDesktop ? 'pb-20' : ''}`}
      >
        <Outlet />
      </main>
      {isDesktop ? <DesktopFooter /> : <MobileFooter />}
      {!isDesktop && <MobileBottomNav />}
      <Toaster position="bottom-right" richColors expand duration={8000} />
    </>
  );
}
