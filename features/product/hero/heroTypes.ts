export interface ProductHeroSlide {
  id: string | number;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  description: string;
  image: string;
  tag?: string;
  ctaText?: string;
}

export interface BlindItem {
  top: SVGRectElement;
  bottom: SVGRectElement;
  y: number;
  h: number;
}

export interface ProductHeroProps {
  slides?: ProductHeroSlide[];
  intervalMs?: number;
  blindCount?: number;
  className?: string;
}
