import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ThemeToggle } from "@/components/shared/theme-toggle";
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
  title: "Dr. Rahul Mishra",
  description: "Academic research portfolio",
  openGraph: {
    title: "Dr. Rahul Mishra",
    description: "Academic research portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Rahul Mishra",
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
        "font-sans",
        inter.variable,
        cormorantGaramond.variable,
        GeistMono.variable,
      )}
      suppressHydrationWarning
    >
      <head>
      </head>
      <body className="min-h-dvh antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4 focus:text-foreground">
            Skip to content
          </a>
          <ThemeToggle />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
