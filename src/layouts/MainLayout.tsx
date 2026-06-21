import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useAuth, useMediaQuery, useTheme } from '@/hooks';
import { MOBILE_BOTTOM_NAV_SPACER } from './constant';
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
    <div className="flex min-h-dvh flex-col">
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
        className={`bg-background text-on-surface flex w-full flex-col ${!isDesktop ? 'pb-20' : ''}`}
      >
        <Outlet />
      </main>
      {isDesktop ? (
        <DesktopFooter />
      ) : (
        <>
          <MobileFooter />
          <div aria-hidden className={MOBILE_BOTTOM_NAV_SPACER} />
        </>
      )}
      {!isDesktop && <MobileBottomNav />}
      <Toaster position="bottom-right" richColors expand duration={8000} />
    </div>
  );
}
