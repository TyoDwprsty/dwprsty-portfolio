import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  variable: "--font-dm-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dprasetyo - Fullstack Website Developer",
  description: "I'm a Curious and self-learning person who loves to code and create new things. I'm a fullstack developer with experience in various technologies.",
  authors: [
    {
      name: "Dwi Prasetyo",
    },
  ],
  keywords: ["Fullstack Developer", "Website Developer", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-fixed">{children}<Toaster />
      </body>
    </html>
  );
}

