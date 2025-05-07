import type * as React from "react";

import { cn } from "@lynkeer/ui/lib/utils";

interface Props extends React.ComponentProps<"input"> {
  errorMsg?: string;
}

function Input({ className, type, errorMsg, ...props }: Props) {
  return (
    <div className="flex flex-col w-full gap-0.5">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:bg-destructive/5 dark:aria-invalid:bg-destructive/10",
          className,
        )}
        {...props}
      />
      {errorMsg && <p className="text-xs px-1 text-destructive tracking-wide">{errorMsg}</p>}
    </div>
  );
}

export { Input };
