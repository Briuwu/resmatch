import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ResumeStoreProvider } from "@/providers/resume-store-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resmatch | AI-Powered Job Discovery for Developers",
  description:
    "Resmatch uses AI to turn your resume into real-time job matches. Upload your resume and instantly find personalized job listings with no filters or hassle.",
  keywords: [
    "Resmatch",
    "AI job finder",
    "resume job matching",
    "developer jobs",
    "tech job search",
    "AI job assistant",
    "entry level developer jobs",
    "remote tech jobs",
  ],
  // metadataBase: new URL('https://resmatch.com'),
  // openGraph: {
  //   title: 'Resmatch – AI-Powered Job Discovery',
  //   description:
  //     'Upload your resume and let Resmatch match you with developer jobs — in real time. No filters, no forms. Just personalized job listings powered by AI.',
  //   url: 'https://resmatch.com',
  //   siteName: 'Resmatch',
  //   images: [
  //     {
  //       url: '/og-image.png', // replace with your actual OG image path
  //       width: 1200,
  //       height: 630,
  //       alt: 'Resmatch AI Job Finder',
  //     },
  //   ],
  //   locale: 'en_US',
  //   type: 'website',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Resmatch – AI-Powered Job Discovery',
  //   description:
  //     'Let AI do the job hunting. Resmatch analyzes your resume and finds the best developer jobs — instantly.',
  //   site: '@your_twitter_handle', // optional
  //   creator: '@your_twitter_handle', // optional
  //   images: ['/og-image.png'],
  // },
  // icons: {
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistMono.variable} ${geistSans.variable} min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 antialiased`}
      >
        <ResumeStoreProvider>{children}</ResumeStoreProvider>
        <Toaster
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: "rgb(30 41 59)",
              border: "1px solid rgb(51 65 85)",
              color: "rgb(226 232 240)",
            },
          }}
        />
      </body>
    </html>
  );
}
