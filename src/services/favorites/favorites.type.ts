import type { IEvent } from '../events/events.type';

export interface IFavorite {
  id: string;
  userId: string;
  eventId: string;
}

export type TCreateFavoritePayload = Omit<IFavorite, 'id'>;

export type FavoritesLoaderData = {
  events: IEvent[];
  favorites: Promise<IFavorite[]>;
};
