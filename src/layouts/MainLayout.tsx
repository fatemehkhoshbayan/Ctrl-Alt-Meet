import { Outlet } from 'react-router-dom';
import { useTheme } from '@hooks/useTheme';

export default function MainLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header>
        <button
          type="button"
          onClick={toggleTheme}
          className="bg-primary px-unit py-unit text-on-primary rounded"
        >
          {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
        </button>
      </header>
      <main className="mx-auto flex min-h-screen min-w-[80%] flex-col items-center justify-center">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
