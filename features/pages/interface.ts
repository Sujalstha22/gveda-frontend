export interface PageListItem {
  title: string;
  slug: string;
  createdAt: string;
}

export interface Page {
  _id: string;
  title?: string;
  slug?: string;
  content: string;
  createdAt?: string;
}
