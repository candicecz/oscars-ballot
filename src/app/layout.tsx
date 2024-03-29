import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const year = new Date(
  `${process.env.NEXT_PUBLIC_OSCARS_DATETIME}`
).getFullYear();

export const metadata: Metadata = {
  title: `Oscars Ballot | ${year}`,
  description: `Vote for your favorite movies and actors for the ${year} Oscars.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/assets/logo.png" sizes="any" />

      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
