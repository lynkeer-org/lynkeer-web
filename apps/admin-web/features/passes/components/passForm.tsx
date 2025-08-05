"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import type { LoyaltyPassType } from "@/features/passes/types/loyaltyPassSchema";

import { Button } from "@lynkeer/ui/components/button";
import { Input } from "@lynkeer/ui/components/input";
import { Label } from "@lynkeer/ui/components/label";

import { FormSkeleton } from "@/features/passes/components/formSkeleton";
import { useCreatePassTemplates } from "@/features/passes/hooks/useCreatePassTemplates";
import { useGetPassTypes } from "@/features/passes/hooks/useGetPassTypes";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { defaultLogoUrlEnv } from "@/lib/utils/environmentValues";

import { toast } from "sonner";

function PassForm() {
  const router = useRouter();
  const defaultLogoUrl = defaultLogoUrlEnv;
  const { mutate: createPassTemplates, isPending } = useCreatePassTemplates();
  const { data: passTypes, isLoading: isLoadingPassTypes, error: passTypesError } = useGetPassTypes();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useFormContext<LoyaltyPassType>();

  /**
   * Set the first available pass type when data is loaded
   */
  useEffect(() => {
    if (passTypes && passTypes.length > 0 && passTypes[0]) {
      setValue("passTypeId", passTypes[0].id);
    }
  }, [passTypes, setValue]);

  // Handle errors
  useErrorHandler(passTypesError, "Error al cargar los tipos de pases");

  const handleCreatePass: SubmitHandler<LoyaltyPassType> = async (data) => {
    try {
      createPassTemplates(data, {
        onSuccess: (response) => {
          toast.success("Tarjeta creada correctamente");
          router.push(`/passes/${response.id}`);
        },
        onError: () => {
          toast.error("Error al crear la tarjeta, por favor intenta nuevamente");
        },
      });
    } catch (_error) {
      toast.error("Error al crear la tarjeta, por favor intenta nuevamente");
    }
  };

  if (isLoadingPassTypes) {
    return <FormSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit(handleCreatePass)}>
      <div className="grid gap-6">
        <div className="grid gap-6 grid-cols-1 items-start lg:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="passName">Nombre de la tarjeta</Label>
            <Input
              id="passName"
              type="text"
              placeholder="Nombre de la tarjeta"
              required
              aria-invalid={Boolean(errors.passName)}
              {...register("passName")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stampGoal">Cantidad de sellos</Label>
            <Input
              id="stampGoal"
              type="number"
              placeholder="0"
              max="30"
              required
              aria-invalid={Boolean(errors.stampGoal)}
              errorMsg={errors.stampGoal?.message}
              {...register("stampGoal")}
            />
          </div>

          <input type="hidden" {...register("logoUrl", { value: defaultLogoUrl })} />
          <input type="hidden" {...register("textColor", { value: "#000000" })} />
          <input type="hidden" {...register("backgroundColor", { value: "#FFFFFF" })} />
          <input type="hidden" {...register("passTypeId")} />
        </div>

        <Button loading={isPending} type="submit">
          Crear
        </Button>
      </div>
    </form>
  );
}

export { PassForm };
