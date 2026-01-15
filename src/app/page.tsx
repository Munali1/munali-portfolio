import AnimatedSection from "@/components/AnimatedSection";
import Badge from "@/components/Badge";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/SectionHeader";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "AI & Cloud", href: "#ai-cloud" },
  { label: "Contact", href: "#contact" },
];

const skillCategories = [
  {
    title: "Languages & Frameworks",
    items: ["C#", "ASP.NET Core", "SQL", "Python", "Java"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6 text-[var(--accent)]"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M7 8l-3 4 3 4M17 8l3 4-3 4M13 6l-2 12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS (Lambda, ECS, S3, CloudWatch, SES)",
      "Terraform",
      "OpenTofu",
      "CI/CD (YAML)",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6 text-[var(--accent)]"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.3-1.8A4 4 0 0 0 7 18Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL", "SQL Server"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6 text-[var(--accent)]"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M4 7c0-2 4-4 8-4s8 2 8 4-4 4-8 4-8-2-8-4Zm0 5c0 2 4 4 8 4s8-2 8-4m-16 5c0 2 4 4 8 4s8-2 8-4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Workflows & Tools",
    items: ["Temporal", "Auth0", "Stripe", "OpenAI SDK"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6 text-[var(--accent)]"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M7 7h10v10H7zM4 4h4M16 4h4M4 16h4M16 20h4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const experiences = [
  {
    role: "Associate Software Engineer",
    company: "Proventus Analytics",
    highlights: [
      "Built RESTful APIs using C# and ASP.NET Core for production workflows.",
      "Deployed AWS infrastructure with Terraform for repeatable environments.",
      "Implemented CI/CD pipelines to automate deployments and checks.",
      "Integrated MongoDB, Auth0, and Stripe for secure data and payments.",
      "Implemented Temporal workflows for reliable background processing.",
      "Contributed to AI features using the OpenAI SDK.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Proventus Analytics",
    highlights: [
      "Built foundational APIs supporting internal tools.",
      "Implemented AWS S3 integrations for asset storage.",
      "Collaborated with cross-functional teams on delivery.",
    ],
  },
];

const projects = [
  {
    name: "GovConnect",
    description:
      "A government services portal focused on secure, compliant access to citizen workflows and case data.",
    stack: ["ASP.NET", "C#", "REST", "SQL"],
  },
  {
    name: "Payroll Management System",
    description:
      "Automated payroll processing with job scheduling, approvals, and audit-ready reporting.",
    stack: ["ASP.NET Core", "EF Core", "Hangfire", "SQL Server"],
  },
  {
    name: "E-commerce Platform",
    description:
      "Scalable storefront and order management platform with modular services and clean admin tooling.",
    stack: ["ASP.NET MVC", "C#", "Stripe", "MySQL"],
  },
];

const aiHighlights = [
  {
    title: "Temporal Workflows",
    description:
      "Reliable orchestration for long-running jobs, retries, and resilient background processing.",
  },
  {
    title: "Infrastructure as Code",
    description:
      "Terraform and OpenTofu pipelines to provision AWS environments with confidence.",
  },
  {
    title: "OpenAI Integrations",
    description:
      "AI-assisted features using the OpenAI SDK, tuned for real product workflows.",
  },
  {
    title: "Data Pipelines",
    description:
      "Secure ingestion, transformation, and observability for production datasets.",
  },
];

export default function Home() {
  return (
    <div className="text-foreground">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
        <Container className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] text-sm font-semibold">
              MS
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Munali Shakya
              </p>
              <p className="text-xs text-muted">Software Engineer</p>
            </div>
          </div>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 text-sm font-medium text-muted-strong lg:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </Container>
      </header>

      <main>
        <AnimatedSection
          id="top"
          className="relative overflow-hidden pb-20 pt-20 lg:pt-28"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--accent)]/20 blur-[140px]" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#c026ff]/25 blur-[160px]" />
          </div>
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative z-10">
                <Badge className="bg-transparent text-[var(--accent)]">
                  Backend + Cloud Engineer
                </Badge>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-display">
                  Software Engineer building scalable backend & cloud systems
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  C#, ASP.NET Core, AWS, Terraform, Temporal, and AI integrations
                  for cloud-native, production-ready platforms.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black shadow-[var(--shadow)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]"
                  >
                    View Projects
                  </a>
                  <a
                    href="/Munali_Shakya-CV.pdf"
                    className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
                  >
                    Download CV
                  </a>
                </div>
                <div className="mt-10 flex flex-wrap gap-3 text-sm text-muted">
                  <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1">
                    Backend Engineering
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1">
                    Cloud Infrastructure
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1">
                    Workflow Orchestration
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1">
                    AI Integration
                  </span>
                </div>
              </div>
              <div className="relative z-10">
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                    Primary Stack
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    C#, ASP.NET Core, AWS, Terraform, Temporal, MongoDB
                  </h3>
                  <div className="mt-6 space-y-4 text-sm text-muted">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-strong">
                        Focus Areas
                      </p>
                      <p className="mt-2">
                        Backend development, cloud infrastructure, reliability
                        engineering, AI-assisted workflows.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-strong">
                        Delivery
                      </p>
                      <p className="mt-2">
                        Production-ready APIs, CI/CD automation, and scalable
                        service design.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--background)] px-4 py-3 text-xs text-muted">
                    Open to backend, cloud, and AI-focused roles.
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </AnimatedSection>

        <AnimatedSection id="about" className="py-20">
          <Container className="grid gap-10 lg:grid-cols-[0.5fr_1fr]">
            <SectionHeader
              eyebrow="About"
              title="Backend-first engineer with a cloud-native mindset"
              description="Focused on building reliable, scalable systems with clean APIs, stable infrastructure, and thoughtful automation."
            />
            <div className="space-y-6 text-base leading-relaxed text-muted">
              <p>
                Backend-focused Software Engineer with experience building
                cloud-native applications using C# and ASP.NET Core. Skilled in
                AWS, Infrastructure as Code (Terraform/OpenTofu), CI/CD
                pipelines, Temporal workflows, and AI integrations using OpenAI
                SDK.
              </p>
              <p>
                I care about reliability, observability, and the operational
                details that keep services stable in production. I enjoy
                translating product goals into scalable backend systems with
                clear workflows and measurable outcomes.
              </p>
            </div>
          </Container>
        </AnimatedSection>

        <AnimatedSection
          id="skills"
          className="border-t border-[var(--border)] py-20"
        >
          <Container>
            <SectionHeader
              eyebrow="Skills"
              title="Focused, production-ready stack"
              description="A pragmatic toolset centered on backend services, cloud infrastructure, and workflow orchestration."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {skillCategories.map((category) => (
                <div
                  key={category.title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[var(--accent)]"
                >
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </AnimatedSection>

        <AnimatedSection id="experience" className="py-20">
          <Container>
            <SectionHeader
              eyebrow="Experience"
              title="Building reliable systems at scale"
              description="Highlights from backend, cloud, and AI-focused roles."
            />
            <div className="relative mt-10">
              <div className="absolute left-2 top-2 h-full w-px bg-[var(--border)]" />
              <div className="space-y-8">
                {experiences.map((experience) => (
                  <div
                    key={experience.role}
                    className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 pl-10 shadow-[var(--shadow)]"
                  >
                    <span className="absolute left-0 top-7 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--background)]">
                      <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    </span>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {experience.role}
                        </h3>
                        <p className="text-sm text-muted">{experience.company}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {experience.highlights.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </AnimatedSection>

        <AnimatedSection
          id="projects"
          className="border-t border-[var(--border)] py-20"
        >
          <Container>
            <SectionHeader
              eyebrow="Projects"
              title="Selected backend systems and platforms"
              description="A mix of public and internal work focused on secure APIs, automation, and scalable services."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[var(--accent)]"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-strong">
                    GitHub available upon request
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </AnimatedSection>

        <AnimatedSection id="ai-cloud" className="py-20">
          <Container>
            <SectionHeader
              eyebrow="AI, Cloud & Reliability"
              title="The differentiators that make systems durable"
              description="Combining orchestration, infrastructure automation, and AI to deliver reliable backend services."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {aiHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[var(--accent)]"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </AnimatedSection>

        <AnimatedSection
          id="contact"
          className="border-t border-[var(--border)] py-20"
        >
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader
              eyebrow="Contact"
              title="Let us build something reliable together"
              description="Open to backend, cloud, and AI-focused roles."
            />
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
              <div className="space-y-4 text-sm text-muted">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-strong">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-strong">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-strong">
                    LinkedIn
                  </p>
                  <a
                    href="https://www.linkedin.com/in/munali-shakya-665b0b253/"
                    className="mt-2 inline-flex items-center gap-2 text-foreground"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-[var(--accent)]"
                      aria-hidden="true"
                    >
                      <path d="M5.05 3.5a1.9 1.9 0 0 1 0 3.8 1.9 1.9 0 0 1 0-3.8Zm-1.3 6.3h2.6v10.7h-2.6V9.8Zm6.32 0h2.5v1.46h.03c.35-.67 1.2-1.38 2.47-1.38 2.64 0 3.13 1.77 3.13 4.07v6.55h-2.6v-5.8c0-1.38-.03-3.16-1.93-3.16-1.93 0-2.22 1.53-2.22 3.06v5.9h-2.6V9.8Z" />
                    </svg>
                    linkedin.com/in/munali-shakya-665b0b253
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-strong">
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
              <ContactForm />
            </div>
          </Container>
        </AnimatedSection>
      </main>

      <footer className="border-t border-[var(--border)] py-10 text-center text-xs text-muted">
        <Container>
          <p>
            Built with Next.js, Tailwind CSS, and Framer Motion. Ready for Vercel
            or Netlify deployments.
          </p>
        </Container>
      </footer>
    </div>
  );
}
