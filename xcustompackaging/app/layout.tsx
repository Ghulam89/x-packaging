import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/widgets/header/Header";
import Footer from "@/components/widgets/footer/Footer";
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "X Custom Packaging | Wholesale Custom Boxes",
    template: "%s | X Custom Packaging"
  },
  description:
    "Get high-quality custom packaging boxes at wholesale prices. Bulk discounts, free design support, and fast shipping across the US.",
  keywords: [
    "x custom packaging",
    "custom boxes",
    "wholesale boxes",
    "eco-friendly packaging",
    "packaging design"
  ],
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: "https://xcustompackaging.com"
  },
  openGraph: {
    type: "website",
    url: "https://xcustompackaging.com",
    siteName: "X Custom Packaging",
    title: "X Custom Packaging | Wholesale Custom Boxes",
    description:
      "High-quality custom packaging boxes at wholesale prices. Free design support and fast shipping.",
  },
  twitter: {
    card: "summary_large_image",
    title: "X Custom Packaging | Wholesale Custom Boxes",
    description:
      "High-quality custom packaging boxes at wholesale prices. Free design support and fast shipping."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      > 
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
