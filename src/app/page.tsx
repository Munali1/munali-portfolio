import AnimatedSection from "@/components/AnimatedSection";
import ExperienceShowcase from "@/components/ExperienceShowcase";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import SectionHeader from "@/components/SectionHeader";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import SiteEffects from "@/components/SiteEffects";
import CommandPalette from "@/components/CommandPalette";
import PaletteButton from "@/components/PaletteButton";
import SkyBackground from "@/components/SkyBackground";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const experiences = [
  {
    role: ".NET Intern",
    company: "Spiralogics International",
    period: "Feb – Apr 2025",
    meta: "Internship | 3 mos",
    stack: ["C#", "ASP.NET MVC", "SQL Server", "Clean Architecture", "Hangfire", "Chart.js"],
    highlights: [
      "Built features for full-stack ASP.NET MVC applications in C# and SQL Server during a three-month internship.",
      "I structured code with Clean Architecture, automated recurring tasks with Hangfire, and built Chart.js dashboards for user-facing reports.",
      "This was where I learned to work in a real codebase with code reviews and team deadlines.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Proventus Analytics",
    period: "Earlier stage",
    meta: "Internship",
    stack: ["C#", "API Development", "Unit Testing", "AWS S3"],
    highlights: [
      "Developed foundational C# APIs supporting internal tools.",
      "Wrote unit tests to keep API changes safe.",
      "Implemented AWS S3 integrations for asset storage.",
      "Collaborated with cross-functional teams on delivery.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Proventus Analytics",
    period: "Current role",
    meta: "Full-time",
    stack: ["C#", "ASP.NET Core", "AWS", "Terraform", "CI/CD", "MongoDB", "Auth0", "Stripe", "Temporal", "OpenAI SDK"],
    highlights: [
      "Built RESTful APIs using C# and ASP.NET Core for production workflows.",
      "Deployed AWS infrastructure with Terraform for repeatable environments.",
      "Implemented CI/CD pipelines to automate deployments and checks.",
      "Integrated MongoDB, Auth0, and Stripe for secure data and payments.",
      "Implemented Temporal workflows for reliable background processing.",
      "Contributed to AI features using the OpenAI SDK.",
    ],
  },
];

const projects = [
  {
    name: "RentMatrix",
    type: "Property management software",
    description:
      "Property management software. I work on the backend and the DevOps side: authentication and authorization, feature development, AI integration, payment gateway integration, and CI/CD on AWS.",
    stack: ["Backend", "AWS", "CI/CD", "WorkOS", "Auth0", "Stripe", "Twilio", "OpenAI"],
  },
  {
    name: "GovConnect",
    type: "Government services portal",
    description:
      "A portal where citizens use government services and follow their cases, with access control and data privacy built in.",
    stack: ["ASP.NET", "C#", "REST", "SQL"],
    url: "https://github.com/Munali1/GovConnect-EGov",
  },
  {
    name: "Payroll Management System",
    type: "Payroll automation",
    description:
      "Runs payroll on a schedule, routes it through approvals, and produces reports you can audit.",
    stack: ["ASP.NET Core", "EF Core", "Hangfire", "SQL Server"],
    url: "https://github.com/Munali1/Payroll-Management-System",
  },
  {
    name: "E-commerce Platform",
    type: "Online store",
    description:
      "A storefront with order management and an admin area.",
    stack: ["ASP.NET MVC", "C#", "MySQL"],
    url: "https://github.com/Munali1/Ecommerce-DarazClone",
  },
];

export default function Home() {
  return (
    <div className="text-foreground">
      <SkyBackground />
      <SiteEffects />
      <CommandPalette />
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border border-[var(--border)] bg-[var(--card)] py-2 pl-5 pr-2 shadow-[var(--shadow)] backdrop-blur-xl">
          <a href="#" className="font-display text-base font-extrabold tracking-tight">
            MS<span className="text-[var(--accent)]">.</span>
          </a>
          <nav aria-label="Primary" className="flex items-center gap-1 text-sm font-medium text-muted-strong">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 transition hover:bg-[var(--accent-soft)] hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <PaletteButton />
          </div>
        </div>
      </header>

      <main>
        <HeroSection />

        <AnimatedSection id="experience" className="pb-4 pt-28">
          <Container>
            <SectionHeader
              index="01"
              eyebrow="Experience"
              title="Where I've worked."
            />
            <ExperienceShowcase experiences={experiences} />
          </Container>
        </AnimatedSection>

        <AnimatedSection
          id="projects"
          className="pb-4 pt-10"
        >
          <Container>
            <SectionHeader
              index="02"
              eyebrow="Projects"
              title="Things I've built."
            />
            <ProjectsShowcase projects={projects} />
          </Container>
        </AnimatedSection>

        <AnimatedSection
          id="contact"
          className="pb-16 pt-10"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <SectionHeader index="03" eyebrow="Contact" title={<>Want to work <span className="text-gradient">together?</span></>} />
                <div className="mt-8 grid gap-4 text-sm text-muted">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-strong">
                      Email
                    </p>
                    <a
                      href="mailto:munali.shakya@gmail.com"
                      className="mt-2 inline-flex items-center gap-2 text-foreground"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4 text-[var(--accent)]"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 6h16v12H4z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="m4 7 8 6 8-6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      munali.shakya@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-strong">
                      GitHub
                    </p>
                    <a
                      href="https://github.com/Munali1"
                      className="mt-2 inline-flex items-center gap-2 text-foreground"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-[var(--accent)]"
                        aria-hidden="true"
                      >
                        <path d="M12 2c-5.52 0-10 4.59-10 10.25 0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.5 0-.24-.01-.88-.01-1.72-2.79.63-3.38-1.38-3.38-1.38-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.55 2.36 1.1 2.93.84.09-.66.35-1.1.63-1.35-2.23-.27-4.58-1.15-4.58-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.31.1-2.73 0 0 .85-.28 2.78 1.06.81-.23 1.67-.35 2.52-.35.86 0 1.72.12 2.52.35 1.93-1.34 2.78-1.06 2.78-1.06.55 1.42.2 2.47.1 2.73.64.72 1.03 1.64 1.03 2.77 0 3.96-2.35 4.83-4.59 5.09.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .28.18.6.69.5A10.03 10.03 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
                      </svg>
                      github.com/Munali1
                    </a>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-strong">
                      LinkedIn
                    </p>
                    <a
                      href="https://www.linkedin.com/in/munalishakya/"
                      className="mt-2 inline-flex items-center gap-2 break-all text-foreground"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-[var(--accent)]"
                        aria-hidden="true"
                      >
                        <path d="M5.05 3.5a1.9 1.9 0 0 1 0 3.8 1.9 1.9 0 0 1 0-3.8Zm-1.3 6.3h2.6v10.7h-2.6V9.8Zm6.32 0h2.5v1.46h.03c.35-.67 1.2-1.38 2.47-1.38 2.64 0 3.13 1.77 3.13 4.07v6.55h-2.6v-5.8c0-1.38-.03-3.16-1.93-3.16-1.93 0-2.22 1.53-2.22 3.06v5.9h-2.6V9.8Z" />
                      </svg>
                      linkedin.com/in/munalishakya
                    </a>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-strong">
                      Phone
                    </p>
                    <a
                      href="tel:+9779840095558"
                      className="mt-2 inline-flex items-center gap-2 text-foreground"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4 text-[var(--accent)]"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden="true"
                      >
                        <path
                          d="M6.5 4.5h3l1 4-2 1a12 12 0 0 0 6 6l1.5-2 4 1v3.2c0 .7-.5 1.3-1.2 1.4-6.8 1-12.9-5.1-11.9-11.9.1-.7.7-1.2 1.4-1.2Z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      +977 9840095558
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                  Send a message
                </p>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
                  Tell me a bit about the role or project and I&apos;ll get back
                  to you.
                </p>
                <ContactForm />
              </div>
            </div>
          </Container>
        </AnimatedSection>
      </main>

      <footer className="py-10 text-center text-xs text-muted">
        <Container>
          <p>
            Built with Next.js, Tailwind CSS and Framer Motion.
          </p>
        </Container>
      </footer>
    </div>
  );
}
