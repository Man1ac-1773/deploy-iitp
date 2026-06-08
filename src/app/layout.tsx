import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spatial Lab",
  description: "Academic research portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark font-sans", GeistSans.variable)}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
