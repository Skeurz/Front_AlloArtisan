export interface Review {
  id?: number;
  comment: string;
  starRating: number;
  reviewer: string;
  receiver: string;
  dateCreated?: Date;
  lastModified?: Date;
}
