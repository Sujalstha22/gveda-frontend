import { Suspense } from 'react';
import Login from "@/features/login/Login";

export default function Home() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-warm-ivory" />}>
            <Login />
        </Suspense>
    );
}
