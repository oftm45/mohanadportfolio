import type { CSSProperties } from 'react';

type TechTextProps = {
  text?: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  letterSpacing?: number;
  color?: string;
  accentColor?: string;
  align?: 'left' | 'center' | 'right';
  reveal?: 'area' | 'letter' | 'off';
  reach?: number;
  softness?: number;
  dashLength?: number;
  dashGap?: number;
  strokeWidth?: number;
  lineStyle?: 'dashed' | 'solid';
  specks?: number;
  selection?: boolean;
  labels?: boolean;
  draggable?: boolean;
  bounce?: number;
  sweep?: boolean;
  speed?: number;
  clickKick?: boolean;
  intro?: 'none' | 'type' | 'assemble' | 'metrics';
  introDuration?: number;
  guides?: boolean;
  className?: string;
  style?: CSSProperties;
};

declare const TechText: (props: TechTextProps) => JSX.Element;
export default TechText;