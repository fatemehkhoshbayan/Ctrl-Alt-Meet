import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '@/layouts/constant';

export default function MobileBottomNav() {
  return (
    <nav className="border-outline-variant bg-surface-container fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t p-4 backdrop-blur-xl">
      {NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex items-center justify-center rounded-full px-5 py-1 transition-all duration-200 ${
                  isActive ? 'bg-primary/20' : 'bg-transparent'
                }`}
              >
                <Icon size={40} strokeWidth={isActive ? 2.5 : 1.75} />
              </span>
              <span className="text-headline-md md:text-label-xl font-medium tracking-wide">
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
