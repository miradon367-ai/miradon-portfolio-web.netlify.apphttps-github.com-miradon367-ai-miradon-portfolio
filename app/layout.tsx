import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Miradon | AI Video Creation Expert & Full-Stack Developer",
  description:
    "Official portfolio of Mira David don (Miradon) — AI Video Creation Expert, AI Developer, and Modern Website Designer specializing in cinematic trailers, commercials, and scalable software solutions.",
  keywords: [
    "AI Video Creation",
    "Cinematic AI Trailers",
    "Generative AI Video",
    "AI Developer",
    "Website Designer",
    "Miradon",
    "Mira David don",
    "Next.js Developer",
    "Runway Gen-3",
    "Midjourney",
  ],
  authors: [{ name: "Mira David don" }],
  creator: "Mira David don",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://miradon-portfolio.netlify.app",
    title: "Miradon | AI Video Creation Expert & Software Developer",
    description:
      "Transforming creative concepts into cinematic AI visuals and high-performance digital applications.",
    siteName: "Miradon Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miradon | AI Video Creation Expert & Software Developer",
    description:
      "Transforming creative concepts into cinematic AI visuals and high-performance digital applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 antialiased cyber-background selection:bg-cyan-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
