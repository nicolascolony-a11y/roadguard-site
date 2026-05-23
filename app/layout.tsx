import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoadGuard | Premium Dash Cams",
  description:
    "Premium dash cams with 4K recording, radar alerts, mirror displays, and smart protection features.",

  openGraph: {
    title: "RoadGuard",
    description:
      "Premium dash cams with smart protection features.",
    url: "https://roadguard.tech",
    siteName: "RoadGuard",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RoadGuard Dash Cams",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RoadGuard",
    description:
      "Premium dash cams with smart protection features.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}