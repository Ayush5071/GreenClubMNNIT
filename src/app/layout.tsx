import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Club MNNIT - Official Website",
  description: "Official website of Green Club MNNIT. We take care of plantation, river flora and fauna, sustainability, and all environmental activities on campus.",
  keywords: "Green Club, MNNIT, plantation, sustainability, flora, fauna, environment, campus activities, Motilal Nehru National Institute of Technology Prayagraj, NIT Allahabad, MNNIT, MNNITA, NIT Prayagraj",
  authors: [{ name: "Green Club MNNIT" }],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    title: "Green Club MNNIT - Official Website",
    description: "Official website of Green Club MNNIT. We take care of plantation, river flora and fauna, sustainability, and all environmental activities on campus.",
    url: "https://green-club-mnnit.vercel.app",
    type: "website",
    images: [
      {
        url: "https://green-club-mnnit.vercel.app/Images/logo.webp",
        width: 800,
        height: 600,
        alt: "Green Club MNNIT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@greenclubmnnit",
    title: "Green Club MNNIT - Official Website",
    description: "Official website of Green Club MNNIT. We take care of plantation, river flora and fauna, sustainability, and all environmental activities on campus.",
    images: "https://www.greenclubmnnit.com/twitter-image.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/gclogo.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
        <Analytics/>
      </body>
    </html>
  );
}
