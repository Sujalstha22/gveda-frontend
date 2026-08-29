import PageView from '@/features/pages/components/PageView';

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <PageView slug={slug} />;
}
