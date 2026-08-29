export interface FooterNavLink {
  label: string;
  href: string;
}

export const FOOTER_NAV_LINKS: FooterNavLink[] = [
  { label: 'HOME', href: '/' },
  { label: 'OUR STORY', href: '/about' },
  { label: 'PRODUCT', href: '/product' },
  { label: 'BLOGS', href: '/blog' },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'EVENTS', href: '/events' },
  { label: 'CONTACT', href: '/contact' },
];

export interface SocialLink {
  label: string;
  href: string;
  type: 'facebook' | 'linkedin' | 'instagram';
}

export const FOOTER_SOCIALS: SocialLink[] = [
  { label: 'Facebook', href: 'https://facebook.com', type: 'facebook' },
  { label: 'LinkedIn', href: 'https://linkedin.com', type: 'linkedin' },
  { label: 'Instagram', href: 'https://instagram.com', type: 'instagram' },
];
