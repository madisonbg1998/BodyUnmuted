import type { Metadata } from "next";
import "./globals.css";
import { instrumentSerif, domine, ibmPlexSans, inter } from "./fonts";

export const metadata: Metadata = {
  title: "Body Unmuted",
  description: "Make your body your best business asset",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${domine.variable} ${ibmPlexSans.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
