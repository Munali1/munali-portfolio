import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Munali Shakya | Software Engineer",
  description:
    "Backend-focused Software Engineer specializing in C#, ASP.NET Core, AWS, Terraform, Temporal, and AI integrations.",
  keywords: [
    "Munali Shakya",
    "Software Engineer",
    "Backend",
    "AWS",
    "Terraform",
    "Temporal",
    "ASP.NET Core",
    "AI Integration",
  ],
  openGraph: {
    title: "Munali Shakya | Software Engineer",
    description:
      "Backend, cloud, and AI-focused engineer building scalable, production-ready systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Munali Shakya | Software Engineer",
    description:
      "Backend, cloud, and AI-focused engineer building scalable, production-ready systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
