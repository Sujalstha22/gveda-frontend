export interface NavLinkItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/about' },
  { label: 'Product', href: '/product' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
];
