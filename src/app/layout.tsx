import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import SocialSidebar from "@/components/SocialSidebar";
import EmailSidebar from "@/components/EmailSidebar";
import ScrollColorChange from "@/components/ScrollColorChange";
import { MDXComponentsProvider } from "@/components/MDXComponents";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Myungguk Lee | Software Engineer",
  description: "Myungguk Lee is a software engineer who specializes in building exceptional digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-[var(--navy)] text-[var(--slate)] transition-colors duration-300`}
      >
        <ThemeProvider defaultTheme="dark">
          <MDXComponentsProvider>
            <Navigation />
            <SocialSidebar />
            <EmailSidebar />
            <ScrollColorChange />
            <main>
              {children}
            </main>
            <CustomCursor />
          </MDXComponentsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
