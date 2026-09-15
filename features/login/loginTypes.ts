export type AuthMode = 'login' | 'signup';

export interface LoginSlide {
  id: string;
  image: string;
}

export interface LoginStory {
  id: string;
  image: string;
  tag: string;
  title: string;
  quote: string;
  link: string;
  linkText: string;
}

export interface BlindItem {
  top: SVGRectElement;
  bottom: SVGRectElement;
  y: number;
  h: number;
}

