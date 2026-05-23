import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoadGuard",
  description: "Premium dash cams for everyday drivers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/roadguard-logo.png" />
        <link rel="apple-touch-icon" href="/roadguard-logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}