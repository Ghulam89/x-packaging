import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/widgets/header/Header";
import Footer from "@/components/widgets/footer/Footer";
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
    index: process.env.NEXT_PUBLIC_NOINDEX === "1" ? false : true,
    follow: process.env.NEXT_PUBLIC_NOINDEX === "1" ? false : true,
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
        className="antialiased"
      >
        {/* <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a> */}
        <Header />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
