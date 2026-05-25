import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoadGuard | Premium Dash Cams",
  description:
    "Premium dash cams with 4K recording, radar alerts, mirror displays, and smart protection features.",
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