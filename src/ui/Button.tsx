import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  BtnText?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'link';
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'till';
  loading?: boolean;
  'aria-label'?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconLeft?: ReactNode;
  children?: ReactNode;
}

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-body text-label-md transition-all active:scale-95',
  {
    variants: {
      variant: {
        filled: '',
        outlined: 'border bg-transparent ring-1 ring-offset-0',
        link: '!bg-transparent border-0 border-b border-b-transparent rounded-none hover:border-b-current focus:border-b-current !ring-0',
      },
      color: {
        primary: 'border-primary text-primary hover:bg-primary/10',
        secondary: 'border-secondary text-secondary hover:bg-secondary/10',
        tertiary: 'border-tertiary text-tertiary hover:bg-tertiary/10',
        quaternary: 'border-quaternary text-quaternary hover:bg-quaternary/10',
        till: 'border-till text-till hover:bg-till/10',
      },
      size: {
        xs: 'px-6 py-2 w-9 h-9',
        sm: 'px-8 py-2',
        md: 'px-10 py-3',
        lg: 'px-12 py-4 text-body-lg',
      },
    },
    compoundVariants: [
      {
        variant: 'filled',
        color: 'primary',
        className:
          'border-transparent bg-primary text-on-primary shadow-primary/25 shadow-lg hover:bg-primary/90',
      },
      {
        variant: 'filled',
        color: 'secondary',
        className: 'border-transparent bg-secondary text-on-secondary hover:bg-secondary/90',
      },
      {
        variant: 'filled',
        color: 'tertiary',
        className: 'border-transparent bg-tertiary text-gray-500 hover:bg-tertiary/90',
      },
      {
        variant: 'filled',
        color: 'quaternary',
        className: 'border-transparent bg-quaternary hover:bg-quaternary/90',
      },
      {
        variant: 'filled',
        color: 'till',
        className: 'border-transparent bg-till text-on-primary hover:bg-till/90',
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
  BtnText,
  type = 'button',
  children,
  ...rest
}: IButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, color, size }), className)}
      {...rest}
    >
      {icon}
      {BtnText && <p>{BtnText}</p>}
      {children}
      {iconLeft}
    </button>
  );
}
