import LenisProvider from "@/shared/providers/LenisProvider";
import QueryProvider from "@/shared/providers/QueryProvider";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/shared/layout/Navbar";
import Footer from "@/shared/layout/Footer";
import { PreloaderProvider } from "@/shared/context/PreloaderContext";
import ClientShell from "@/shared/ui/ClientShell";
import { TransitionProvider } from "@/shared/ui/TransitionProvider";


export const metadata: Metadata = {
  metadataBase: new URL("https://gveda.com"),
  title: {
    default: "GVEDA — Botanical Science for Modern Skin",
    template: "%s | GVEDA",
  },
  description:
    "Thoughtfully formulated skincare powered by botanical ingredients and modern science.",
  icons: {
    icon: { url: "/logo/gveda_logo.svg", type: "image/svg+xml" },
    shortcut: "/logo/gveda_logo.svg",
    apple: "/logo/gveda_logo.svg",
  },
  openGraph: {
    title: "GVEDA — Botanical Science for Modern Skin",
    description:
      "Thoughtfully formulated skincare powered by botanical ingredients and modern science.",
    url: "https://gveda.com",
    siteName: "GVEDA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <PreloaderProvider>
          <QueryProvider>
          <ClientShell>
            <LenisProvider>
              <TransitionProvider>
                <Navbar />
                {children}
                <Footer />
              </TransitionProvider>
            </LenisProvider>
          </ClientShell>
          </QueryProvider>
        </PreloaderProvider>
      </body>
    </html>
  );
}
