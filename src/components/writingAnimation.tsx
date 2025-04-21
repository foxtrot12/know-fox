import React, { useRef, useEffect, memo, SVGProps, useState } from "react";

export interface WritingProps extends SVGProps<SVGSVGElement> {
  text: string;
  /**animation duration in ms */
  duration?: number; 
  /**start delay in ms */
  delay?: number; 
  fontSize?: number; 
}

const WritingAnimation: React.FC<WritingProps> = ({
  text,
  duration = 2,
  delay = 0,
  fontSize = 48,
  ...props
}) => {
  const textRef = useRef<SVGTextElement>(null);
  const [pathLength, setPathLength] = useState<number>(0);

  useEffect(() => {
    if (!textRef.current) return;
    const el = textRef.current;
    const length = el.getComputedTextLength();
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;

    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const runTime = timestamp - startTime;
      if (runTime < delay) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      const elapsed = runTime - delay;
      const progress = Math.min(elapsed / (duration), 1);
      el.style.strokeDashoffset = `${length * (1 - progress)}`;
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    setPathLength(length);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, duration, delay]);

  return (
    <svg
      aria-label={text}
      {...props}
      width={pathLength}
    >
      <text
        ref={textRef}
        y={fontSize}
        fontSize={fontSize}
        fill="none"
      >
        {text}
      </text>
    </svg>
  );
};

export default memo(WritingAnimation);
