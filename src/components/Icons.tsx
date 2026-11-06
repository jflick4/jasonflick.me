import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 16, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };
}

/** Four-point star — Wonder */
export function WonderIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
      <path d="M19 3v3M17.5 4.5h3" />
    </svg>
  );
}

/** Flask — Experiment */
export function ExperimentIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 3h6" />
      <path d="M10 3v6L4.6 18.6A1.6 1.6 0 0 0 6 21h12a1.6 1.6 0 0 0 1.4-2.4L14 9V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

/** Mountain with sun — All of it */
export function AllOfItIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 20l5.5-9 4 6 2.5-3.5L21 20z" />
      <circle cx="17" cy="6.5" r="2" />
    </svg>
  );
}

export function PlayIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...base({ size: 18, ...props })}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base({ size: 18, ...props })}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export const doorIcons = {
  wonder: WonderIcon,
  experiment: ExperimentIcon,
  "all-of-it": AllOfItIcon,
} as const;
