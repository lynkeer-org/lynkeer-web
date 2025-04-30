"use client";

import { Button } from "@lynkeer/ui/components/button";
import { Input } from "@lynkeer/ui/components/input";
import { Label } from "@lynkeer/ui/components/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type React from "react";

function InputPassword({ ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((value) => !value);
  };

  return (
    <>
      <Label htmlFor="password">Contraseña</Label>
      <div className="relative w-full">
        <Input id="password" type={showPassword ? "text" : "password"} required className="pr-10" {...props} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleTogglePassword}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground"
        >
          {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      </div>
    </>
  );
}

export { InputPassword };
