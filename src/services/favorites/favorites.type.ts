export interface IFavorite {
  id: string;
  userId: string;
  eventId: string;
}

export type TCreateFavoritePayload = Omit<IFavorite, 'id'>;
