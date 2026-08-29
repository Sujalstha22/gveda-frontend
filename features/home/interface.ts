import type { ApiImage } from "@/shared/api";
import type { ProductListItem } from "@/features/product/interface";

export interface HomeSlider {
  title: string;
  text: string | null;
  btnText: string;
  btnLink: string;
  image: ApiImage;
}

export interface HomeCategory {
  name: string;
  slug: string;
  image: ApiImage;
}

export interface HomeTestimonial {
  _id: string;
  name: string;
  position: string;
  text: string;
  image: ApiImage;
}

export interface HomeNotice {
  _id: string;
  title: string;
  type: string;
  message: string;
  btnText: string;
  link: string;
  image: ApiImage;
}

export interface HomeBlog {
  title: string;
  slug: string;
  content: string;
  image: ApiImage;
}

export interface HomeVideo {
  _id: string;
  title: string;
  slug: string;
  video: string;
}

export interface HomepageData {
  sliders: HomeSlider[];
  categories: HomeCategory[];
  testimonials: HomeTestimonial[];
  products: ProductListItem[];
  notices: HomeNotice[];
  blogs: HomeBlog[];
  concerns: HomeCategory[];
  popularProducts: ProductListItem[];
  videos: HomeVideo[];
}
