import React from "react";

interface GlassSurfaceProps {
  children?: React.ReactNode;
  className?: string;
  height?: number;
  borderRadius?: number;
}

export default function GlassSurface({ children, className = "", height, borderRadius = 12 }: GlassSurfaceProps) {
  const style: React.CSSProperties = {};
  if (typeof height === "number") style.height = height;
  if (typeof borderRadius === "number") style.borderRadius = borderRadius;

  return (
    <div
      className={`${className} bg-white/5 backdrop-blur-md border border-border shadow-sm overflow-hidden`}
      style={style}
    >
      {children}
    </div>
  );
}
