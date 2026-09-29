import { LoginStory, LoginSlide } from './loginTypes';

export const LOGIN_STORIES: LoginStory[] = [
  {
    id: 'story-1',
    image: '/images/login/log-in1.jpeg',
    tag: "Anna’s Ritual Story",
    title: "Guiding you to healthy, radiant skin",
    quote: "“I tried countless skincare routines before GVEDA. With their botanical formulations and scientific balance, I finally saw calm, clear, and glowing skin.”",
    link: '/about',
    linkText: 'Discover Botanical Rituals',
  },
  {
    id: 'story-2',
    image: '/images/login/log-in2.jpeg',
    tag: "Sophia’s Glow Journey",
    title: "Gentle balance, visible skin renewal",
    quote: "“The Retinol C Toner & botanical face wash transformed my skin texture in just 14 days without any redness or moisture stripping.”",
    link: '/product',
    linkText: 'Explore Formulations',
  },
  {
    id: 'story-3',
    image: '/images/login/log-in3.jpeg',
    tag: "Elena’s Barrier Restoration",
    title: "Pure botanical actives backed by science",
    quote: "“Finally a skincare ritual rooted in botanical integrity. My skin barrier feels deeply hydrated, nourished, and balanced all day.”",
    link: '/blog',
    linkText: 'Read Ritual Stories',
  },
];

export const LOGIN_SLIDES: LoginSlide[] = LOGIN_STORIES.map((s) => ({
  id: s.id,
  image: s.image,
}));

