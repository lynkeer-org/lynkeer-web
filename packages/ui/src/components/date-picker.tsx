"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@lynkeer/ui/components/button";
import { Calendar } from "@lynkeer/ui/components/calendar";
import { Label } from "@lynkeer/ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@lynkeer/ui/components/popover";
import { cn } from "@lynkeer/ui/lib/utils";

interface Props {
  label: string;
  placeholder: string;
  errorMsg?: string;
  onDisabled?: (date: Date) => boolean;
  onChange: (date: Date | undefined) => void;
}

function DatePicker({ label, placeholder, onChange, onDisabled, errorMsg }: Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn("[&>span]:w-full [&>span]:justify-between", !date && "text-muted-foreground")}
          >
            {date ? date.toLocaleDateString() : placeholder}

            <CalendarIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
              onChange(date);
            }}
            disabled={onDisabled ?? undefined}
          />
        </PopoverContent>
      </Popover>
      {errorMsg && <p className="text-xs px-1 text-destructive tracking-wide">{errorMsg}</p>}
    </div>
  );
}

export { DatePicker };
