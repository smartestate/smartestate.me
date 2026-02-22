import React from "react";
import "./GradientText.css";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number; // seconds
  showBorder?: boolean;
  direction?: "horizontal" | "vertical" | "diagonal";
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#6155f5", "#99b1ff", "#bcb7fb"],
  animationSpeed = 4,
  showBorder = false,
  direction = "horizontal",
  pauseOnHover = false,
  yoyo = true,
}: GradientTextProps) {
  const gradientAngle = direction === "horizontal" ? "to right" : direction === "vertical" ? "to bottom" : "to bottom right";
  const gradientColors = [...colors, colors[0]].join(", ");
  const backgroundSize = direction === "horizontal" ? "300% 100%" : direction === "vertical" ? "100% 300%" : "300% 300%";

  const textStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize,
    backgroundRepeat: "repeat",
    animationDuration: `${animationSpeed}s`,
    animationDirection: yoyo ? "alternate" : "normal",
    animationName: direction === 'vertical' ? 'gradient-move-vertical' : 'gradient-move-horizontal',
  };

  return (
    <span className={`animated-gradient-text ${showBorder ? "with-border" : ""} ${className}`} data-pause-on-hover={pauseOnHover}>
      {showBorder && <span className="gradient-overlay" aria-hidden />}
      <span className="text-content" style={textStyle}>
        {children}
      </span>
    </span>
  );
}
