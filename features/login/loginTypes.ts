export type AuthMode = 'login' | 'signup';

export interface LoginSlide {
  id: string;
  image: string;
}

export interface BlindItem {
  top: SVGRectElement;
  bottom: SVGRectElement;
  y: number;
  h: number;
}
