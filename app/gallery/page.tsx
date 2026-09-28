import type { Metadata } from 'next';
import GalleryGrid from '@/features/gallery/components/GalleryGrid';
import GalleryHero from '@/features/gallery/components/GalleryHero';

export const metadata: Metadata = {
    title: 'Gallery — GVEDA',
    description: 'A visual journey through sacred botanicals, mindful craftsmanship, and luminous skin.',
};

export default function GalleryPage() {
    return (
        <>
            <GalleryHero />
            <GalleryGrid />
        </>
    );
}

