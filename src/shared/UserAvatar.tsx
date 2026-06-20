import { User } from 'lucide-react';
import { cn } from '@/lib';
import type { IUser } from '@/services';

type TUserAvatarUser = Pick<IUser, 'name' | 'avatar' | 'imageUrl'>;

interface IUserAvatarProps {
  user: TUserAvatarUser;
  className?: string;
  sizeClassName?: string;
}

export default function UserAvatar({
  user,
  className,
  sizeClassName = 'h-10 w-10 text-sm',
}: IUserAvatarProps) {
  if (user.imageUrl) {
    return (
      <img
        src={user.imageUrl}
        alt={user.name}
        className={cn('rounded-full object-cover', sizeClassName, className)}
      />
    );
  }

  return (
    <p
      className={cn(
        'bg-primary text-on-primary flex items-center justify-center rounded-full font-bold',
        sizeClassName,
        className,
      )}
      aria-hidden={!user.avatar}
    >
      {user.avatar || <User size={20} />}
    </p>
  );
}
