import React from 'react';
import ProductDetail from '@/features/product/components/ProductDetail';

interface Params {
    slug: string;
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    return <ProductDetail slug={slug} />;
}
