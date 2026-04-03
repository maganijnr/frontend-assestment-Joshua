import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // add any weights you need
  variable: "--font-poppins", // best for Tailwind
  display: "swap", // prevents flash of unstyled text
});

export const metadata: Metadata = {
  title: "Content Explorer",
  description: "Explore all the movie content you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        {/*Helps with loading the images faster*/}
        <link
          rel="preconnect"
          href="https://cdn.dummyjson.com"
          crossOrigin="anonymous"
        />

        {/* Helps with the API data fetching */}
        <link
          rel="preconnect"
          href="https://dummyjson.com"
          crossOrigin="anonymous"
        />
      </head>
      <ReactQueryProvider>
        <body className="min-h-full flex flex-col">{children}</body>
      </ReactQueryProvider>
    </html>
  );
}
