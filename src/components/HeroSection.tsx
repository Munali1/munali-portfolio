"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import Container from "@/components/Container";
import SystemIllustration from "@/components/SystemIllustration";

const TECHNOLOGIES = ["C#", "ASP.NET Core", "AWS", "Terraform", "Temporal"];

export default function HeroSection() {
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["start 0.1", "start -0.15"],
  });

  return (
    <section ref={hero} className="story-hero" aria-labelledby="hero-heading">
      <Container>
        <div className="hero-content story-hero-grid">
          <div className="story-hero-copy">
            <p className="story-kicker">
              <span className="caption-rule" aria-hidden="true" />
              Backend &amp; cloud engineering
            </p>
            <h1 id="hero-heading" className="story-headline">
              <span>Backend systems</span>
              <span>Built to hold up</span>
            </h1>
            <p className="story-hero-intro">
              I&apos;m Munali, a software engineer building reliable APIs, cloud
              infrastructure, and the background workflows that keep products
              running
            </p>
            <div className="hero-actions">
              <a href="#projects" className="button-primary">
                Selected work
                <ArrowDown size={18} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a
                href="/Munali_Shakya-CV.pdf"
                download
                className="button-secondary"
              >
                Download CV
                <Download size={18} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="min-w-0">
            <SystemIllustration scrollProgress={scrollYProgress} />
          </div>
        </div>

        <div className="hero-afterword">
          <p>
            From the first endpoint to the deployment pipeline, I connect APIs,
            cloud infrastructure, and automation to make systems easier to
            operate, scale, and trust
          </p>
          <ul aria-label="Technologies">
            {TECHNOLOGIES.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
