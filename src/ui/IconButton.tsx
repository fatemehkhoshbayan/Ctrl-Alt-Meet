import { cn } from '@/lib';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}

export default function IconButton({ icon, className, onClick, type, ...rest }: IIconButtonProps) {
  return (
    <button
      className={cn(
        'text-primary flex items-center p-2 transition-transform hover:scale-105',
        className,
      )}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {icon}
    </button>
  );
}
