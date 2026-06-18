export type ReadingStatus = 'Wishlist' | 'Reading' | 'Finished' | 'Paused' | 'Abandoned';

export interface Quote {
  id: string;
  pageId: string;
  text: string;
  note?: string;
  pageNumber?: number;
  createdAt: string;
}

export interface PageImage {
  id: string;
  pageId: string;
  fileName: string;
  originalFileName: string;
  contentType: string;
  url: string;
  createdAt: string;
}

export interface PageListItem {
  id: string;
  title: string;
  author: string;
  genre?: string;
  status: ReadingStatus;
  rating: number;
  createdAt: string;
  updatedAt: string;
  coverImageUrl?: string;
}

export interface PageDetails extends PageListItem {
  publisher?: string;
  year?: number;
  isbn?: string;
  pageCount?: number;
  startedAt?: string;
  finishedAt?: string;
  characters?: string;
  summary?: string;
  personalReview?: string;
  quotes: Quote[];
  images: PageImage[];
}

export type PagePayload = {
  title: string;
  author: string;
  genre?: string;
  publisher?: string;
  year?: number | null;
  isbn?: string;
  pageCount?: number | null;
  startedAt?: string | null;
  finishedAt?: string | null;
  status: ReadingStatus;
  rating: number;
  characters?: string;
  summary?: string;
  personalReview?: string;
};

export type QuotePayload = {
  pageId: string;
  text: string;
  note?: string;
  pageNumber?: number | null;
};

export type ImageUrlPayload = {
  url: string;
  description?: string;
};
