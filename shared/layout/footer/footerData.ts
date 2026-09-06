export interface FooterNavLink {
  label: string;
  href: string;
}

export const FOOTER_NAV_LINKS: FooterNavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/about' },
  { label: 'Product', href: '/product' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
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
