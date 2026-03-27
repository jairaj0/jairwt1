import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jai | SaaS & AI Interface Designer & Developer",
  description:
    "I build high-converting SaaS & AI product interfaces that drive revenue. 40+ projects delivered for global clients.",
  keywords: [
    "SaaS UI",
    "AI product design",
    "frontend developer",
    "landing page",
    "dashboard UI",
    "React developer",
    "Next.js developer",
  ],
  openGraph: {
    title: "Jai | SaaS & AI Interface Designer & Developer",
    description:
      "I build high-converting SaaS & AI product interfaces that drive revenue.",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
