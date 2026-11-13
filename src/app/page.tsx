import AnimatedSection from "@/components/AnimatedSection";
import ExperienceShowcase from "@/components/ExperienceShowcase";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import SectionHeader from "@/components/SectionHeader";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ThemeToggle from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const experiences = [
  {
    role: "Associate Software Engineer",
    company: "Proventus Analytics",
    period: "Current role",
    dates: "June 2025–present",
    story: "Taking responsibility for the whole system",
    summary:
      "At Proventus, my work connects the API, the infrastructure beneath it, and the workflows that keep it running. That means thinking beyond the endpoint: how code ships, how jobs recover, and how a team builds on it.",
    focus: ["API engineering", "Cloud & delivery", "Reliable workflows"],
    highlights: [
      "Built RESTful APIs using C# and ASP.NET Core for production workflows.",
      "Deployed AWS infrastructure with Terraform for repeatable environments.",
      "Implemented CI/CD pipelines to automate deployments and checks.",
      "Integrated MongoDB, Auth0, and Stripe for secure data and payments.",
      "Implemented Temporal workflows for reliable background processing.",
      "Contributed to AI features using the OpenAI SDK.",
      "Containerized services with Docker and implemented ECS and EC2 Auto Scaling using Spot and On-Demand capacity.",
      "Mentored junior developers through code reviews and technical guidance.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Proventus Analytics",
    period: "Earlier stage",
    story: "Building the foundations",
    summary:
      "Internal tools were a place to connect backend fundamentals to everyday needs: useful APIs, dependable asset storage, and delivery alongside a cross-functional team.",
    focus: ["Internal tools", "AWS S3", "Team delivery"],
    highlights: [
      "Built foundational APIs supporting internal tools.",
      "Implemented AWS S3 integrations for asset storage.",
      "Collaborated with cross-functional teams on delivery.",
    ],
  },
  {
    role: ".NET Intern",
    company: "Spiralogics International Pvt. Ltd.",
    period: "February–April 2025",
    story: "Connecting the full stack",
    summary:
      "At Spiralogics, I worked across the interface, application logic, and database. Clean Architecture and background jobs helped me see how those pieces could stay maintainable as an application grew.",
    focus: ["ASP.NET MVC", "Clean Architecture", "Hangfire"],
    highlights: [
      "Worked on full-stack web application development using ASP.NET MVC, C#, and SQL Server.",
      "Applied Clean Architecture principles to structure scalable and maintainable codebases.",
      "Implemented background job processing using Hangfire to automate periodic tasks and used Chart.js for visualization.",
    ],
  },
];

const projects = [
  {
    name: "RentMatrix",
    featured: true,
    type: "Property management platform",
    description:
      "Property management software that brings leases, maintenance, and property finances into one workspace.",
    contributions: [
      "Backend APIs and access controls for property workflows",
      "Background workflow reliability with Temporal",
      "Cloud infrastructure and deployment automation",
    ],
    stack: ["C#", "ASP.NET Core", "MongoDB", "Temporal", "AWS", "Terraform"],
    url: "https://rentmatrix.app",
  },
  {
    name: "GovConnect",
    type: "Public services",
    description:
      "A government services portal focused on secure, compliant access to citizen workflows and case data.",
    stack: ["ASP.NET", "C#", "REST", "SQL"],
    contributions: ["Domain modeling, secure service access, and citizen workflows"],
    url: "https://github.com/Munali1/GovConnect-EGov",
  },
  {
    name: "Payroll Management System",
    type: "Workflow automation",
    description:
      "Automated payroll processing with job scheduling, approvals, and audit-ready reporting.",
    stack: ["ASP.NET Core", "EF Core", "Hangfire", "SQL Server"],
    contributions: ["Job scheduling, approval flows, and traceable reporting"],
    url: "https://github.com/Munali1/Payroll-Management-System",
  },
  {
    name: "E-commerce Platform",
    type: "Commerce",
    description:
      "Scalable storefront and order management platform with modular services and clean admin tooling.",
    stack: ["ASP.NET MVC", "C#", "Stripe", "MySQL"],
    contributions: ["Order management, Stripe payments, and modular services"],
    url: "https://github.com/Munali1/Ecommerce-DarazClone",
  },
];

const contactDetails = [
  {
    label: "Email",
    href: "mailto:munali.shakya@gmail.com",
    value: "munali.shakya@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/Munali1",
    value: "github.com/Munali1",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/munali-shakya-665b0b253/",
    value: "linkedin.com/in/munali-shakya-665b0b253",
  },
  {
    label: "Phone",
    href: "tel:+9779840095558",
    value: "+977 9840095558",
  },
];

export default function Home() {
  return (
    <div id="top" className="text-foreground">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-lg bg-[var(--foreground)] px-4 py-3 text-[var(--background)] focus:not-sr-only focus:fixed focus:left-6 focus:top-4"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="flex h-20 items-center gap-3 sm:gap-6">
          <a
            href="#top"
            aria-label="Munali Shakya home"
            className="flex shrink-0 items-center gap-3 rounded-lg"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] font-display text-sm font-medium"
              aria-hidden="true"
            >
              MS
            </span>
            <span>
              <span className="block text-sm font-medium text-foreground sm:text-base">
                Munali Shakya
              </span>
              <span className="mt-1 block text-xs text-muted">
                Software Engineer
              </span>
            </span>
          </a>
          <Navigation items={navItems} />
          <ThemeToggle />
        </Container>
      </header>

      <main id="main-content" tabIndex={-1}>
        <HeroSection />

        <AnimatedSection id="experience" className="story-section">
          <Container>
            <SectionHeader
              eyebrow="01 / Experience"
              title="From building features to connecting systems"
              description="The emphasis here is on production-facing engineering work: APIs, infrastructure, automation, and integrations that support ongoing delivery."
            />
            <ExperienceShowcase experiences={experiences} />
          </Container>
        </AnimatedSection>

        <AnimatedSection
          id="projects"
          className="story-section projects-section border-t border-[var(--border)]"
        >
          <Container>
            <SectionHeader
              eyebrow="02 / Projects"
              title="Selected work"
              description="Backend engineering, reliable workflows, and the products they support"
            />
            <ProjectsShowcase projects={projects} />
          </Container>
        </AnimatedSection>

        <AnimatedSection
          id="contact"
          className="story-section border-t border-[var(--border)]"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="min-w-0">
                <SectionHeader
                  eyebrow="03 / Contact"
                  title="What are you building next?"
                />
                <dl className="mt-8 grid gap-6">
                  {contactDetails.map((detail) => (
                    <div key={detail.label}>
                      <dt className="text-sm text-muted">{detail.label}</dt>
                      <dd className="mt-2">
                        <a
                          href={detail.href}
                          className="inline-flex max-w-full items-start gap-2 rounded-sm text-sm leading-6 text-foreground underline-offset-4 transition-colors duration-150 ease-[var(--ease)] hover:text-[var(--accent)] hover:underline"
                        >
                          <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                            {detail.value}
                          </span>
                          <ArrowUpRight
                            size={18}
                            strokeWidth={1.5}
                            className="mt-1 shrink-0 text-muted"
                            aria-hidden="true"
                          />
                        </a>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Send a message
                </p>
                <p className="mt-4 max-w-lg text-base leading-7 text-muted-strong">
                  A short brief is enough. Include the role, problem space, or
                  project scope and I can respond with relevant context.
                </p>
                <ContactForm />
              </div>
            </div>
          </Container>
        </AnimatedSection>
      </main>

      <footer className="border-t border-[var(--border)] py-8 text-sm leading-6 text-muted">
        <Container>
          <p>
            Built with Next.js, Tailwind CSS, Framer Motion, and Codex.
            Human-led, AI-assisted.
          </p>
        </Container>
      </footer>
    </div>
  );
}
