import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Demo Web Service",
  description: "A Next.js web service with a blog feature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Demo Web Service. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
