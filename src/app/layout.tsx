import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { GTMScript, GTMNoScript } from "@/components/GTMScript";
import { AEOScripts } from "@/components/AEOScripts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Crie Seu Site Profissional | Biomo",
  description: "Crie seu site profissional em poucos minutos. Sites modernos, responsivos e otimizados para o seu negócio.",
  keywords: [
    // AEO Core Terms
    "criação de site profissional",
    "empresa criação de site",
    "site para vender serviços",
    "landing page google ads",
    "site para anúncios",
    "criar site para captar clientes",
    "agência criação de sites",
    // Existing keywords
    "site institucional",
    "site responsivo",
    "landing page",
    "site empresarial"
  ],
  // ... existing code ...
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <GTMScript />
        <AEOScripts />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <GTMNoScript />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
