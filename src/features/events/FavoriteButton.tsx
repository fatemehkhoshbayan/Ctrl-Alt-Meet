import { Star } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks';
import { cn } from '@/lib';
import { useFavoritesByUserId, useAddFavorite, useRemoveFavorite } from '@/services';
import { IconButton } from '@/ui';

interface IFavoriteButtonProps {
  eventId: string;
  size?: number;
  className?: string;
}

export default function FavoriteButton({ eventId, size = 20, className }: IFavoriteButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { data: favorites = [] } = useFavoritesByUserId(user?.id);
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();

  const isFavorite = favorites.some(favorite => favorite.eventId === eventId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (isFavorite) {
      const favoriteId = favorites.find(favorite => favorite.eventId === eventId)?.id;
      if (favoriteId) removeFavorite(favoriteId);
    } else {
      addFavorite({ userId: user.id, eventId });
    }
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
