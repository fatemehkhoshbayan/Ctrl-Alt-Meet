import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

const cardVariants = cva('rounded-lg transition-all duration-200', {
  variants: {
    variant: {
      outline: 'border-2 p-4',
      container: 'bg-surface-container p-8',
      glass: 'glass-card text-on-surface p-6',
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
});

type TCardVariantProps = VariantProps<typeof cardVariants>;

export interface ICardProps extends TCardVariantProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  role?: HTMLAttributes<HTMLDivElement>['role'];
  'aria-label'?: string;
  'aria-pressed'?: ButtonHTMLAttributes<HTMLButtonElement>['aria-pressed'];
}

function getInteractiveStateClass(selected?: boolean, disabled?: boolean) {
  if (selected) {
    return 'border-primary bg-primary/10 shadow-[0_0_12px_2px_var(--color-primary)]';
  }
  if (disabled) {
    return 'border-outline-variant/30 cursor-not-allowed opacity-50';
  }
  return 'border-outline-variant hover:border-primary/50 cursor-pointer';
}

export default function Card({
  children,
  className,
  variant = 'outline',
  fullWidth = true,
  onClick,
  selected,
  disabled,
  role,
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
}: ICardProps) {
  const isInteractive = Boolean(onClick);

  const classes = cn(
    cardVariants({ variant }),
    fullWidth && 'w-full',
    isInteractive ? cn('text-left', getInteractiveStateClass(selected, disabled)) : undefined,
    className,
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={ariaPressed ?? selected}
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
      </button>
    );
  }

  return (
    <div role={role} aria-label={ariaLabel} className={classes}>
      {children}
    </div>
  );
}
