import { cn } from '@/lib';

interface IIconButtonProps {
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
}

export default function IconButton({ icon, className, onClick, type }: IIconButtonProps) {
  return (
    <button
      className={cn(
        'text-body-xl text-primary p-2 transition-transform hover:scale-105',
        className,
      )}
      type={type}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
