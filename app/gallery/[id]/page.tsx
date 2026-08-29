import GalleryDetail from '@/features/gallery/components/GalleryDetail';
import { notFound } from 'next/navigation';

export default async function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) notFound();
    return <GalleryDetail id={numericId} />;
}
