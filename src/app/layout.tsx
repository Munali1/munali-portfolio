import type { Metadata } from "next";
import { Manrope, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const SITE_URL = "https://munali.com.np";
const TITLE = "Munali Shakya | Backend Engineer (C#, ASP.NET Core, AWS)";
const DESCRIPTION =
  "Munali Shakya is a backend engineer building production APIs, cloud infrastructure and AI integrations with C#, ASP.NET Core, AWS, Terraform and Temporal. Available for remote work worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: "Munali Shakya", url: SITE_URL }],
  creator: "Munali Shakya",
  keywords: [
    "Munali Shakya",
    "Backend Engineer",
    "Software Engineer",
    "C#",
    "ASP.NET Core",
    "AWS",
    "Terraform",
    "Temporal",
    "CI/CD",
    "AI Integration",
    "Remote",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Munali Shakya",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Munali Shakya",
      url: SITE_URL,
      jobTitle: "Backend Engineer",
      description: DESCRIPTION,
      worksFor: { "@type": "Organization", name: "Proventus Analytics" },
      knowsAbout: [
        "C#",
        "ASP.NET Core",
        "AWS",
        "Terraform",
        "Temporal",
        "CI/CD",
        "Authentication and authorization",
        "Payment gateway integration",
        "OpenAI integration",
      ],
      sameAs: [
        "https://www.linkedin.com/in/munali-shakya-665b0b253/",
        "https://github.com/Munali1",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Munali Shakya",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${display.variable} ${mono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
