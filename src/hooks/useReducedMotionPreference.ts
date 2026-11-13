"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function useReducedMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
