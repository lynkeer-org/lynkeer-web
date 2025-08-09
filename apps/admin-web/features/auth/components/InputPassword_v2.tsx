"use client";

import { Button } from "@lynkeer/ui/components/button";
import { Input } from "@lynkeer/ui/components/input";
import { Label } from "@lynkeer/ui/components/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type React from "react";

interface Props extends React.ComponentProps<"input"> {
  errorMsg?: string;
}

function InputPassword({ ...props }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((value) => !value);
  };

  return (
    <>
      <Label htmlFor="password">Contraseña</Label>

      <div className="relative w-full">
        <Input
          className="pr-10"
          id="password"
          type={showPassword ? "text" : "password"}
          min={4}
          max={100}
          required
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleTogglePassword}
          className="absolute top-1.5 right-1 h-6 w-6 p-0 text-muted-foreground"
        >
          {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      </div>
    </>
  );
}

export { InputPassword };
