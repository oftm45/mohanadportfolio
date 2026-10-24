type FolderItem = string | { label: string; value: string };

type FolderFloatProps = {
  items?: FolderItem[];
  label?: string;
  sublabel?: string;
  trigger?: 'hover' | 'click';
  defaultOpen?: boolean;
  closeOnSelect?: boolean;
  physics?: boolean;
  drift?: number;
  onSelect?: (value: string, index: number) => void;
  onOpenChange?: (open: boolean) => void;
  folderColor?: string;
  frontColor?: string;
  paperColor?: string;
  itemColor?: string;
  itemTextColor?: string;
  labelColor?: string;
  width?: number;
  height?: number;
  radius?: number;
  spread?: number;
  lift?: number;
  tilt?: number;
  flapAngle?: number;
  restAngle?: number;
  openDuration?: number;
  stagger?: number;
  bounce?: number;
  className?: string;
};

declare function FolderFloat(props: FolderFloatProps): JSX.Element;
export default FolderFloat;
