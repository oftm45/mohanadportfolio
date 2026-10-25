import { ReactNode, ComponentPropsWithRef, ForwardRefExoticComponent, RefAttributes } from 'react';

export type CardSwapItem = {
  title?: string;
  image?: string;
  icon?: ReactNode;
  alt?: string;
};

export type CardSwapProps = {
  items?: CardSwapItem[];
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  depth?: number;
  skewAmount?: number;
  visibleCards?: number;
  delay?: number;
  autoplay?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  speed?: number;
  bounce?: number;
  parallax?: number;
  hoverSpread?: number;
  dim?: number;
  cardRadius?: number;
  intro?: boolean;
  theme?: 'dark' | 'light';
  onCardClick?: (index: number) => void;
  onChange?: (index: number) => void;
  className?: string;
  children?: ReactNode;
};

export type CardSwapRef = {
  next: () => void;
  prev: () => void;
};

export declare const Card: ForwardRefExoticComponent<
  ComponentPropsWithRef<'div'> & { customClass?: string }
>;

declare const CardSwap: ForwardRefExoticComponent<
  CardSwapProps & RefAttributes<CardSwapRef>
>;

export default CardSwap;
