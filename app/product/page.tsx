import ProductHero from "@/features/product/components/ProductHero";
import ProductsDisplay from "@/features/product/components/ProductsDisplay";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
        <ProductHero />
        <Suspense fallback={<div className="min-h-96" aria-label="Loading products" />}>
          <ProductsDisplay />
        </Suspense>
    </div>
  );
}
