import { ArrowDown, Plus } from "lucide-react";

type Experience = {
  role: string;
  company: string;
  period: string;
  dates?: string;
  story: string;
  summary: string;
  focus: string[];
  highlights: string[];
};

type ExperienceShowcaseProps = {
  experiences: Experience[];
};

export default function ExperienceShowcase({
  experiences,
}: ExperienceShowcaseProps) {
  return (
    <div className="experience-journey">
      {experiences.map((experience, index) => (
        <article
          key={experience.company + experience.role}
          className="journey-chapter"
        >
          <div className="journey-marker" aria-hidden="true">
            <span className="journey-node" />
            <span className="font-mono text-xs tabular-nums">0{index + 1}</span>
          </div>
          <div className="journey-context">
            <p className="text-sm text-muted">{experience.period}</p>
            {experience.dates ? (
              <p className="mt-2 font-mono text-xs text-muted">
                {experience.dates}
              </p>
            ) : null}
            <p className="mt-4 text-base font-medium text-foreground">
              {experience.company}
            </p>
            <h3 className="mt-2 max-w-xs text-sm leading-6 text-muted-strong">
              {experience.role}
            </h3>
          </div>
          <div className="journey-story">
            <h4>{experience.story}</h4>
            <p className="journey-summary">{experience.summary}</p>
            <ul className="journey-focus" aria-label="Focus areas">
              {experience.focus.map((focus) => (
                <li key={focus}>{focus}</li>
              ))}
            </ul>
            <details className="work-disclosure">
              <summary>
                Work in detail
                <Plus size={18} strokeWidth={1.5} aria-hidden="true" />
              </summary>
              <ul className="grid gap-3 pb-6 pt-4 text-sm leading-7 text-muted-strong">
                {experience.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-3 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </article>
      ))}
      <div className="journey-origin">
        <ArrowDown
          size={18}
          strokeWidth={1.5}
          className="text-muted"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-medium text-foreground">
            A foundation in computer science
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-strong">
            BSc Computer Science and Information Technology, St. Xavier&apos;s
            College · 2021–2025
          </p>
          <p className="mt-2 max-w-xl text-xs leading-5 text-muted">
            Fr. Marshall D. Moran, S.J. Memorial Award for Excellence in
            Academics
          </p>
        </div>
      </div>
    </div>
  );
}
