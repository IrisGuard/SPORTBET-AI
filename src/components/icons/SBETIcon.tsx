
import { SVGProps } from 'react';

interface SBETIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const SBETIcon = ({ size = 24, ...props }: SBETIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M8 10.5C8 9.67157 8.67157 9 9.5 9H14.5C15.3284 9 16 9.67157 16 10.5C16 11.3284 15.3284 12 14.5 12H9.5C8.67157 12 8 11.3284 8 10.5Z"
        fill="currentColor"
      />
      <path
        d="M11 13.5C11 12.6716 11.6716 12 12.5 12H14.5C15.3284 12 16 12.6716 16 13.5C16 14.3284 15.3284 15 14.5 15H12.5C11.6716 15 11 14.3284 11 13.5Z"
        fill="currentColor"
      />
      <path
        d="M12 7.5C12 6.67157 12.6716 6 13.5 6C14.3284 6 15 6.67157 15 7.5C15 8.32843 14.3284 9 13.5 9C12.6716 9 12 8.32843 12 7.5Z"
        fill="currentColor"
      />
      <path
        d="M9 16.5C9 15.6716 9.67157 15 10.5 15C11.3284 15 12 15.6716 12 16.5C12 17.3284 11.3284 18 10.5 18C9.67157 18 9 17.3284 9 16.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SBETIcon;
