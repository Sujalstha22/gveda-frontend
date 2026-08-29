import BlogDetail from '@/features/blogs/components/BlogDetail';
import React from 'react';

interface Params {
    slug: string;
}

export default async function BlogDetailPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    return <BlogDetail slug={slug} />;
}
