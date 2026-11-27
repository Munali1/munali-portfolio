import type { Metadata, Viewport } from "next";
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
  applicationName: "Munali Shakya",
  authors: [{ name: "Munali Shakya", url: SITE_URL }],
  creator: "Munali Shakya",
  category: "technology",
  formatDetection: { email: false, telephone: false, address: false },
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
    type: "profile",
    firstName: "Munali",
    lastName: "Shakya",
    username: "Munali1",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#3b3a6b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Munali Shakya",
      givenName: "Munali",
      familyName: "Shakya",
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      jobTitle: "Associate Software Engineer",
      description: DESCRIPTION,
      address: { "@type": "PostalAddress", addressCountry: "NP" },
      worksFor: {
        "@type": "Organization",
        name: "Proventus Analytics",
      },
      hasOccupation: [
        {
          "@type": "Occupation",
          name: "Associate Software Engineer",
          description:
            "Proventus Analytics (current). Builds production REST APIs with C# and ASP.NET Core, AWS infrastructure with Terraform, CI/CD pipelines, Temporal workflows, and integrations with MongoDB, Auth0, Stripe and the OpenAI SDK.",
          skills: "C#, ASP.NET Core, AWS, Terraform, CI/CD, MongoDB, Auth0, Stripe, Temporal, OpenAI SDK",
        },
        {
          "@type": "Occupation",
          name: "Software Engineer Intern",
          description:
            "Proventus Analytics. Developed C# APIs for internal tools, wrote unit tests and built AWS S3 integrations.",
          skills: "C#, API development, unit testing, AWS S3",
        },
        {
          "@type": "Occupation",
          name: ".NET Intern",
          description:
            "Spiralogics International, February to April 2025. Built full-stack ASP.NET MVC features in C# and SQL Server using Clean Architecture, Hangfire background jobs and Chart.js dashboards.",
          skills: "C#, ASP.NET MVC, SQL Server, Clean Architecture, Hangfire, Chart.js",
        },
      ],
      knowsAbout: [
        "C#",
        "ASP.NET Core",
        "ASP.NET MVC",
        "AWS",
        "Terraform",
        "Temporal",
        "CI/CD",
        "SQL Server",
        "MongoDB",
        "Authentication and authorization",
        "Payment gateway integration",
        "OpenAI integration",
      ],
      sameAs: [
        "https://www.linkedin.com/in/munalishakya/",
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
