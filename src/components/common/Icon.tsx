import { SVGAttributes } from 'react';
import { ICONS } from '@types';

interface IconProps extends SVGAttributes<SVGSVGElement> {
  name: string;
  size?: number;
  strokeWidth?: number;
  title?: string;
}

export function Icon({ name = 'spark', size = 18, strokeWidth = 1.6, title, ...props }: IconProps) {
  const icon = ICONS.find(i => i.name === name) || ICONS[0];
  return (
    <svg
      aria-hidden={!title}
      aria-label={title}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={icon.path} />
    </svg>
  );
}