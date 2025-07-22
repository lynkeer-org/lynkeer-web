"use client";

import PhoneInputBase from "react-phone-input-2";
import type { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { cn } from "@lynkeer/ui/lib/utils";

interface Props extends PhoneInputProps {
  className?: string;
  errorMsg?: string;
}

function PhoneInput({ className, errorMsg, ...props }: Props) {
  return (
    <div className="flex flex-col w-full gap-0.5">
      <PhoneInputBase
        country={"mx"}
        inputClass={cn(
          "selection:!bg-primary selection:!text-primary-foreground dark:!bg-input/30 !border-input !flex !h-9 !w-full !min-w-0 !rounded-md !border !bg-transparent !text-sm !shadow-xs !transition-[color,box-shadow] !outline-none disabled:!pointer-events-none disabled:!cursor-not-allowed disabled:!opacity-50 md:!text-sm",
          "focus-visible:!border-ring",
          "aria-invalid:!ring-destructive/20 dark:!aria-invalid:ring-destructive/40 aria-invalid:!border-destructive aria-invalid:!bg-destructive/5 dark:aria-invalid:!bg-destructive/10",
          className,
        )}
        containerClass="[&_.country]:hover:!bg-accent [&_.highlight]:!bg-accent"
        buttonClass="!border-transparent !border-r-input !border-r !bg-transparent [&_.selected-flag]:!bg-transparent"
        searchClass="!bg-card [&_input]:!ml-0 [&_input]:!py-[3px] !pl-[8px]"
        dropdownClass="!bg-card"
        enableSearch
        disableSearchIcon
        searchPlaceholder="Buscar"
        {...props}
      />
      {errorMsg && <p className="text-xs px-1 text-destructive tracking-wide">{errorMsg}</p>}
    </div>
  );
}

export { PhoneInput };
