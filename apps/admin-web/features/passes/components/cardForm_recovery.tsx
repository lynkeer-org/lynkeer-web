"use client";

import { loyaltyPassSchema } from "@/features/passes/types/loyaltyPassSchema";
import type { LoyaltyPassType } from "@/features/passes/types/loyaltyPassSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { internalApi } from "@/lib/axios/internalApi";
import { Button } from "@lynkeer/ui/components/button";
import { Input } from "@lynkeer/ui/components/input";
import { Label } from "@lynkeer/ui/components/label";

function CardForm() {
  const defaultLogoUrl = "/images/defaultStore.png";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoyaltyPassType>({ resolver: zodResolver(loyaltyPassSchema) });

  const handleCreateCard: SubmitHandler<LoyaltyPassType> = async (data) => {
    try {
      // TODO: Move this logic to a action server
      /*
        1. Create a hook to create templates.
        2. Create a action server, that the hook will call using tanstack query.
        3. Create a services folder under features/cards to call the external api.
        4. The action server will call the lib/wallets to create the templates
        5. The result of the action server will be saved into the database.
      */

      const classResponse = await internalApi.post("/wallet/google/loyaltyClass", data);

      const objectResponse = await internalApi.post("/wallet/google/loyaltyObject", {
        classId: classResponse.data.classId,
        name: "Andres Valencia",
        email: "afvalenciab@gmail.com",
        urlImageStamps:
          "https://lynkeer-web-admin-git-feature-lkr-371961-afvalenciabs-projects.vercel.app/api/wallet/stamps/9/2/stamps.png",
        stamps: "2",
      });

      window.open(objectResponse.data.url, "_blank");

      // OPCIÓN B: Usando URLSearchParams (más simple)
      const params = new URLSearchParams({
        storeName: data.passName,
        userId: "12345",
        userEmail: "afvalenciab@gmail.com",
        userName: "Andres Valencia",
      });
      window.open(`/api/wallet/apple/loyaltyPass?${params.toString()}`, "_blank", "noopener");
    } catch (_error) {
      // TODO: Handle error
    }
  };

  return (
    <div className="px-6">
      <form onSubmit={handleSubmit(handleCreateCard)}>
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

            <input type="hidden" {...register("logoUrl")} value={defaultLogoUrl} />
            <input type="hidden" {...register("textColor")} value="#000000" />
            <input type="hidden" {...register("backgroundColor")} value="#FFFFFF" />
          </div>

          <Button type="submit">Crear</Button>
        </div>
      </form>
    </div>
  );
}

export { CardForm };
