import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DesktopHeader, DesktopFooter } from './desktop';
import { MobileFooter, MobileHeader, MobileBottomNav } from './mobile';
import { useMediaQuery, useTheme } from '@/hooks';

export default function MainLayout() {
  const { theme, toggleTheme } = useTheme();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      {isDesktop ? (
        <DesktopHeader theme={theme} toggleTheme={toggleTheme} />
      ) : (
        <MobileHeader theme={theme} toggleTheme={toggleTheme} />
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
