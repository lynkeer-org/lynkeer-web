"use client";

import { Button } from "@lynkeer/ui/components/button";
import { cn } from "@lynkeer/ui/lib/utils";
import { AlertCircle } from "lucide-react";

interface NoFoundDataProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

function NotFoundData({ title, description, actionLabel, onAction, className }: NoFoundDataProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center h-full gap-4", className)}>
      <AlertCircle className="w-15 h-15 text-yellow-500" />

      <p className="text-md text-gray-500 font-semibold">{title}</p>
      {description ? <div className="text-sm text-gray-500 text-center">{description}</div> : null}

      {actionLabel && onAction ? (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export { NotFoundData };
