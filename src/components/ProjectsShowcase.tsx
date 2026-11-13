import { ArrowUpRight } from "lucide-react";

type Project = {
  name: string;
  type: string;
  description: string;
  stack: string[];
  contributions: string[];
  url: string;
  featured?: boolean;
};

type ProjectsShowcaseProps = {
  projects: Project[];
};

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  return (
    <div className="project-index">
      {projects.map((project, index) => (
        <article
          key={project.name}
          className={`project-entry${project.featured ? " project-entry-featured" : ""}`}
          aria-labelledby={`project-title-${index}`}
        >
          <div className="project-entry-heading">
            <p className="project-entry-meta">
              {project.featured && <span>Featured work</span>}
              {project.type}
            </p>
            <h3 id={`project-title-${index}`} className="project-entry-title">
              {project.name}
            </h3>
          </div>
          <div className="project-entry-body">
            <p className="project-entry-description">{project.description}</p>
            <div className="project-contributions">
              <p>{project.featured ? "My contributions" : "Contributions"}</p>
              <ul>
                {project.contributions.map((contribution) => (
                  <li key={contribution}>{contribution}</li>
                ))}
              </ul>
            </div>
            <ul
              className="project-technologies"
              aria-label={`${project.name} technologies`}
            >
              {project.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-entry-link"
              aria-label={
                project.featured
                  ? `Visit ${project.name} (opens in a new tab)`
                  : `View ${project.name} repository (opens in a new tab)`
              }
            >
              {project.featured ? "Visit RentMatrix" : "View repository"}
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
