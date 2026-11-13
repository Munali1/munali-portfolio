"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Pause, RotateCcw } from "lucide-react";
import useReducedMotionPreference from "@/hooks/useReducedMotionPreference";

const stages = [
  { label: "Client", detail: "A person takes an action. The client sends a request." },
  { label: "API", detail: "The API validates the request and checks access." },
  {
    label: "Background worker",
    detail: "A worker handles the longer task, with retries when needed.",
  },
  { label: "Database", detail: "The result is stored, ready for the next request." },
];

function isDesktop() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function RequestStage({
  index,
  active,
  progress,
  reduceMotion,
  onSelect,
}: {
  index: number;
  active: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  onSelect: (index: number) => void;
}) {
  const segment = useTransform(progress, [index / 3, (index + 1) / 3], [0, 1]);

  return (
    <li className="request-stage" data-active={active === index}>
      {index < stages.length - 1 && (
        <span className="request-connector" aria-hidden="true">
          <motion.span
            className="request-line-horizontal"
            style={{ scaleX: reduceMotion ? 1 : segment }}
          />
          <motion.span
            className="request-line-vertical"
            style={{ scaleY: reduceMotion ? 1 : segment }}
          />
        </span>
      )}
      <button
        type="button"
        className="request-stage-button"
        aria-pressed={active === index}
        aria-controls="request-detail"
        onClick={() => onSelect(index)}
      >
        <span className="request-node" aria-hidden="true" />
        <span>{stages[index].label}</span>
      </button>
    </li>
  );
}

export default function SystemIllustration({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotionPreference();
  const figure = useRef<HTMLElement>(null);
  const { scrollYProgress: viewportProgress } = useScroll({
    target: figure,
    offset: ["start 0.7", "center 0.45"],
  });
  const progress = useMotionValue(0);
  const playback = useRef<ReturnType<typeof animate> | null>(null);
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInspecting, setIsInspecting] = useState(false);

  function followScroll(value: number) {
    if (reduceMotion) return;
    playback.current?.stop();
    setIsPlaying(false);
    setIsInspecting(false);
    progress.set(value);
  }

  useMotionValueEvent(scrollProgress, "change", (value) => {
    if (isDesktop()) followScroll(value);
  });

  useMotionValueEvent(viewportProgress, "change", (value) => {
    if (!isDesktop()) followScroll(value);
  });

  useMotionValueEvent(progress, "change", (value) => {
    setActive(Math.min(stages.length - 1, Math.floor(value * (stages.length - 1))));
  });

  useEffect(() => () => playback.current?.stop(), []);

  useEffect(() => {
    if (reduceMotion) playback.current?.stop();
  }, [reduceMotion]);

  function selectStage(index: number) {
    playback.current?.stop();
    setIsPlaying(false);
    setIsInspecting(true);
    progress.set(index / (stages.length - 1));
    setActive(index);
  }

  function replay() {
    playback.current?.stop();
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setIsInspecting(false);
    setIsPlaying(true);
    progress.set(0);
    playback.current = animate(progress, 1, {
      duration: 2.8,
      ease: "linear",
      onComplete: () => setIsPlaying(false),
    });
  }

  return (
    <figure
      ref={figure}
      className="request-flow"
      data-reduced-motion={reduceMotion}
      aria-labelledby="request-caption"
    >
      <figcaption id="request-caption" className="request-caption">
        <span>Behind the request</span>
        {!reduceMotion && (
          <button
            type="button"
            onClick={replay}
            className="request-replay"
            aria-label={isPlaying ? "Pause request animation" : "Replay request animation"}
          >
            {isPlaying ? (
              <Pause size={16} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <RotateCcw size={16} strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        )}
      </figcaption>
      <ol className="request-flow-track" aria-label="Request progression">
        {stages.map((stage, index) => (
          <RequestStage
            key={stage.label}
            index={index}
            active={active}
            progress={progress}
            reduceMotion={reduceMotion}
            onSelect={selectStage}
          />
        ))}
      </ol>
      <p
        id="request-detail"
        className="request-detail"
        aria-live={isInspecting ? "polite" : "off"}
      >
        {reduceMotion && !isInspecting
          ? "A request moves from the client to the API, through background work, and into storage"
          : stages[active].detail}
      </p>
    </figure>
  );
}
