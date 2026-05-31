import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib';
import type { ReactNode } from 'react';

interface IButtonProps extends VariantProps<typeof buttonVariants> {
  onClick: () => void;
  BtnText: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'link';
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconLeft?: ReactNode;
}

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-body text-label-md transition-all active:scale-95',
  {
    variants: {
      variant: {
        filled: '',
        outlined: 'border-outline bg-transparent ring-1 ring-offset-0',
        link: '!bg-transparent border-b border-b-transparent rounded-none hover:border-b-current focus:border-b-current !ring-0',
      },
      color: {
        primary: '',
        secondary: 'bg-secondary text-gray-950 hover:bg-secondary/90',
        tertiary: 'bg-tertiary text-gray-500 hover:bg-tertiary/90',
        quaternary: 'bg-quaternary hover:bg-quaternary/90',
      },
      size: {
        xs: 'px-4 py-2 w-9 h-9',
        sm: 'px-6 py-2',
        md: 'px-8 py-3',
        lg: 'px-10 py-4',
      },
    },
    compoundVariants: [
      {
        variant: 'filled',
        color: 'primary',
        className: 'bg-primary text-on-primary shadow-primary/25 shadow-lg hover:bg-primary/90',
      },
    ],
    defaultVariants: {
      variant: 'filled',
      color: 'primary',
      size: 'md',
    },
  },
);

export default function Button({
  className,
  variant = 'filled',
  color = 'primary',
  size = 'md',
  icon,
  iconLeft,
  onClick,
  BtnText,
  type = 'button',
}: IButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(buttonVariants({ variant, color, size }), className)}
    >
      {icon}
      {BtnText}
      {iconLeft}
    </button>
  );
}
