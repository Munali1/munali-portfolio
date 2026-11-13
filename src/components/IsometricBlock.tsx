import type { ReactNode } from "react";

type IsometricBlockProps = {
  x: number;
  y: number;
  width: number;
  depth: number;
  height: number;
  className?: string;
  children?: ReactNode;
};

// Shared projection for the hero and project cutaways.
export default function IsometricBlock({
  x,
  y,
  width,
  depth,
  height,
  className = "",
  children,
}: IsometricBlockProps) {
  const right = `${x + width},${y + width / 2}`;
  const front = `${x + width - depth},${y + (width + depth) / 2}`;
  const left = `${x - depth},${y + depth / 2}`;

  return (
    <g className={`iso-block ${className}`}>
      <polygon
        className="iso-face iso-front"
        points={`${left} ${front} ${x + width - depth},${y + (width + depth) / 2 + height} ${x - depth},${y + depth / 2 + height}`}
      />
      <polygon
        className="iso-face iso-side"
        points={`${right} ${front} ${x + width - depth},${y + (width + depth) / 2 + height} ${x + width},${y + width / 2 + height}`}
      />
      <polygon
        className="iso-face iso-top"
        points={`${x},${y} ${right} ${front} ${left}`}
      />
      {children}
    </g>
  );
}
