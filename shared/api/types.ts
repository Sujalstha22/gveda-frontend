/** Shapes shared across GVEDA API responses. */

export interface ApiImage {
  _id?: string;
  name: string;
  title?: string | null;
  alt?: string | null;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/** Standard envelope: `{ message, results }`. */
export interface Envelope<T> {
  message: string;
  results: T;
}

/** List envelope with pagination: `{ message, results, pagination }`. */
export interface PagedEnvelope<T> extends Envelope<T[]> {
  pagination: Pagination;
}
