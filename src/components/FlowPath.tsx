"use client";

import { motion } from "framer-motion";
import useReducedMotionPreference from "@/hooks/useReducedMotionPreference";

export default function FlowPath({
  d,
  className = "",
}: {
  d: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotionPreference();

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: reduceMotion ? 0 : 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`flow-path ${className}`}
    />
  );
}
