"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * multiplier]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxElementProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  scale?: boolean;
  rotate?: boolean;
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  className = "",
  speed = 0.3,
  scale = false,
  rotate = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, 360 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale: scale ? scaleValue : 1,
        rotate: rotate ? rotateValue : 0,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxLayersProps {
  className?: string;
}

export const ParallaxLayers: React.FC<ParallaxLayersProps> = ({ className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y3, opacity }}
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
      />
    </div>
  );
};