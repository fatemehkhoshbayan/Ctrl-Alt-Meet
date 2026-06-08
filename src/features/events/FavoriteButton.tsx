import { Star } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '@/hooks';
import { cn } from '@/lib';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/favorites';
import { IconButton } from '@/ui';

interface IFavoriteButtonProps {
  eventId: string;
  size?: number;
  className?: string;
}

export default function FavoriteButton({ eventId, size = 20, className }: IFavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isFavorite = useAppSelector(state =>
    state.favorites.items.some(f => f.eventId === eventId),
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    dispatch(toggleFavorite({ userId: user.id, eventId })).then(result => {
      if (toggleFavorite.fulfilled.match(result)) {
        const message =
          result.payload.action === 'added' ? 'Added to favorites' : 'Removed from favorites';
        toast.success(message);
      }
    });
  };

  return (
    <IconButton
      type="button"
      onClick={handleClick}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={cn('shrink-0', className)}
      icon={
        <Star
          size={size}
          className={cn(
            'transition-colors',
            isFavorite ? 'fill-tertiary text-tertiary' : 'text-on-surface-variant',
          )}
        />
      }
    />
  );
}
