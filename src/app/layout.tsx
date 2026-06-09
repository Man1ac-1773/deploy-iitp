import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spatial Lab",
  description: "Academic research portfolio",
  openGraph: {
    title: "Spatial Lab",
    description: "Academic research portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spatial Lab",
    description: "Academic research portfolio",
  },
  icons: {
    icon: "/favicon.ico",
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
      className={cn(
        "dark font-sans",
        inter.variable,
        cormorantGaramond.variable,
        GeistMono.variable,
      )}
    >
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-dvh antialiased">
        <a href="#portfolio" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4 focus:text-foreground">
          Skip to content
        </a>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
