"use client";

import React, { useEffect, useState } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface MaskedSlideRevealBaseProps {
  text: string | string[];
  staggerDelay?: number;
  fontSize?: number | string;
  color?: string;
  fontWeight?: number | string;
  lineHeight?: number | string;
  className?: string;
  background?: string;
  accentColor?: string;
  accentWords?: string[];
  as?: "h1" | "h2" | "h3" | "h4" | "span";
  frame: number;
  fps: number;
  isAbsolute?: boolean;
}

export function MaskedSlideRevealBase({
  text,
  staggerDelay = 3,
  fontSize,
  color,
  fontWeight,
  lineHeight = 1.0,
  className,
  background = "transparent",
  accentColor,
  accentWords,
  as = "span",
  frame,
  fps,
  isAbsolute = true,
}: MaskedSlideRevealBaseProps) {
  const lines = Array.isArray(text) ? text : [text];
  const Component = as;

  return (
    <div
      style={{
        ...(isAbsolute ? { position: "absolute", inset: 0 } : { position: "relative" }),
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        background,
        width: "100%",
      }}
    >
      <Component
        className={className}
        style={{
          ...(fontSize ? { fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize } : {}),
          ...(fontWeight ? { fontWeight } : {}),
          ...(color ? { color } : {}),
          display: "block",
          textAlign: "left",
          width: "100%",
        }}
      >
        {lines.map((line, lineIdx) => {
          const words = line.split(" ");
          
          // Calculate cumulative word index for stagger delay calculation
          const previousWordsCount = lines
            .slice(0, lineIdx)
            .reduce((acc, l) => acc + l.split(" ").length, 0);

          return (
            <div 
              key={lineIdx} 
              style={{ 
                display: "block", 
                width: "100%", 
                lineHeight: lineHeight,
              }}
            >
              {words.map((word, wordIdx) => {
                const globalWordIdx = previousWordsCount + wordIdx;
                const t = spring({
                  frame: frame - globalWordIdx * staggerDelay,
                  fps,
                  config: { damping: 14 },
                });

                // Is it the last word of the entire text?
                const isLastWordOfText = 
                  lineIdx === lines.length - 1 && wordIdx === words.length - 1;

                const isAccent = 
                  accentWords?.includes(word) || 
                  (accentWords ? false : isLastWordOfText);
                
                const currentWordColor = isAccent ? accentColor : undefined;

                return (
                  <span
                    key={wordIdx}
                    style={{
                      display: "inline-block",
                      overflow: "hidden",
                      verticalAlign: "bottom",
                      lineHeight: lineHeight,
                      marginRight: "0.25em",
                    }}
                  >
                    <span
                      className={isAccent ? "text-accent" : ""}
                      style={{
                        display: "inline-block",
                        transform: `translateY(${(1 - t) * 100}%)`,
                        ...(currentWordColor ? { color: currentWordColor } : {}),
                      }}
                    >
                      {word}
                    </span>
                  </span>
                );
              })}
            </div>
          );
        })}
      </Component>
    </div>
  );
}

// 1. Remotion Player/Composition version (uses Remotion context hooks, defaults to absolute)
export interface MaskedSlideRevealProps extends Omit<MaskedSlideRevealBaseProps, "frame" | "fps"> {
  speed?: number;
}

export function MaskedSlideReveal({
  speed = 1,
  isAbsolute = true,
  ...props
}: MaskedSlideRevealProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  return <MaskedSlideRevealBase {...props} frame={frame} fps={fps} isAbsolute={isAbsolute} />;
}

// 2. Standard Web page version (driven by requestAnimationFrame, defaults to relative positioning)
export function WebMaskedSlideReveal({
  speed = 1,
  isAbsolute = false,
  ...props
}: MaskedSlideRevealProps) {
  const [frame, setFrame] = useState(0);
  const fps = 30;

  useEffect(() => {
    let start: number | null = null;
    let animFrameId: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const currentFrame = (elapsed / 1000) * fps * speed;
      setFrame(currentFrame);
      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameId);
  }, [speed]);

  return <MaskedSlideRevealBase {...props} frame={frame} fps={fps} isAbsolute={isAbsolute} />;
}
