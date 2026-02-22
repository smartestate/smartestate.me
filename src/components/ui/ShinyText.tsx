import React from 'react';
import './ShinyText.css';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number; // seconds
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number; // degrees for gradient
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  delay?: number; // seconds
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 10,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0,
}) => {
  const animDirection = yoyo ? 'alternate' : 'normal';
  const animPlayState = disabled ? 'paused' : 'running';
  const animDir = direction === 'left' ? 'normal' : 'reverse';

  const style: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animationPlayState: animPlayState as any,
    animationDirection: animDir as any,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationName: disabled ? 'none' : undefined,
    animationDuration: `${speed}s`,
    animationDelay: `${delay}s`,
    animationFillMode: 'forwards',
    // allow pause on hover via CSS class
  };

  const classes = `shiny-text ${pauseOnHover ? 'shiny-text--pause-on-hover' : ''} ${className}`.trim();

  return (
    <span className={classes} style={style} data-anim-direction={animDir} data-anim-mode={animDirection}>
      {text}
    </span>
  );
};

export default ShinyText;
