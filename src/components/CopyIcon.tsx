import React from "react";

// Defines the interface for component props
interface CopyIconProps {
  className?: string;
}

// SVG copy icon component with optional style properties
export const CopyIcon: React.FC<CopyIconProps> = ({ className }) => {
  return (
    // SVG with copy icon made from two rectangles
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Upper right rectangle of the copy icon */}
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      {/* Lower left rectangle of the copy icon */}
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
};
