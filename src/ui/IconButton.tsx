import { cn } from '@/lib';
import type { ButtonHTMLAttributes } from 'react';

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
}

export default function IconButton({ icon, className, onClick, type }: IIconButtonProps) {
  return (
    <button
      className={cn(
        'material-symbols-outlined text-body-xl text-primary items-center p-2 transition-transform hover:scale-105',
        className,
      )}
      type={type}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
