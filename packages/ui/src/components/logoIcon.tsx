import { cn } from "@lynkeer/ui/lib/utils";
import type React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

function LogoIcon({ className, ...props }: Props) {
  return (
    <svg className={cn(className)} viewBox="0 0 133 176" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Lynkeer logo</title>
      <path
        d="M93.2 174.6C115.181 174.6 133 156.781 133 134.8C133 112.819 115.181 95 93.2 95C71.2191 95 53.4 112.819 53.4 134.8C53.4 156.781 71.2191 174.6 93.2 174.6Z"
        fill="url(#paint0_linear_1_3)"
      />
      <path
        d="M53.6 134.7C53.6 116 66.5 100.2 84 96C106.4 89.6 125.5 74.1 127 49.5C129.4 9.20001 92.7 -7.99999 57.5 4.00001C10.1 20.1 -11.4 75.9 6.00001 121.6C18.7 154.7 55.1 183.4 102.3 173.8C69.8 177.7 53.7 156.1 53.7 134.8L53.6 134.7Z"
        fill="url(#paint1_linear_1_3)"
      />
      <defs>
        <linearGradient id="paint0_linear_1_3" x1="53.4" y1="134.8" x2="133" y2="134.8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1DA490" />
          <stop offset="1" stopColor="#2ACFA2" />
        </linearGradient>
        <linearGradient id="paint1_linear_1_3" x1="136.2" y1="52.3" x2="12.5" y2="129.7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FA8433" />
          <stop offset="1" stopColor="#ED4A38" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export { LogoIcon };
