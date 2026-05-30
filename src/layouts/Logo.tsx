import { useId } from 'react';

/** Fixed brand colors — same in light and dark (matches public/favicon.svg). */
const LOGO_COLORS = {
  gradientStart: '#d2bbff',
  gradientEnd: '#5a00c6',
  accent: '#ffba20',
  smile: '#ffffff',
} as const;

interface ILogoProps {
  size?: number;
  onClick?: () => void;
}

export function Logo({ size = 32 }: ILogoProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CtrlAltMeet logo"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={LOGO_COLORS.gradientStart} />
          <stop offset="100%" stopColor={LOGO_COLORS.gradientEnd} />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="28" fill={`url(#${gradientId})`} />
      <path
        d="M28,42 L38,32 L48,42"
        fill="none"
        stroke={LOGO_COLORS.accent}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52,42 L62,32 L72,42"
        fill="none"
        stroke={LOGO_COLORS.accent}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32,58 C32,74 68,74 68,58"
        fill="none"
        stroke={LOGO_COLORS.smile}
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoWordMark({ size = 32, onClick }: ILogoProps) {
  return (
    <div className="flex cursor-pointer items-center gap-2.5" onClick={onClick}>
      <Logo size={size} />
      <span
        className="leading-none font-bold tracking-tight"
        style={{
          fontSize: size * 0.6,
          color: 'var(--color-on-surface)',
          fontFamily: '"DM Mono", "Fira Code", monospace',
          letterSpacing: '-0.03em',
        }}
      >
        Ctrl<span style={{ color: 'var(--color-primary)' }}>Alt</span>Meet
      </span>
    </div>
  );
}
