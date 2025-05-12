"use client";

import { cardSchema } from "@/features/cards/types/cardSchema";
import type { CardType } from "@/features/cards/types/cardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { Button } from "@lynkeer/ui/components/button";
import { Input } from "@lynkeer/ui/components/input";
import { Label } from "@lynkeer/ui/components/label";

function CardForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CardType>({ resolver: zodResolver(cardSchema) });

  const handleCreateCard: SubmitHandler<CardType> = (_data) => {
    // TODO: Implement the logic to create a card
  };

  return (
    <div className="px-6">
      <form onSubmit={handleSubmit(handleCreateCard)}>
        <div className="grid gap-6">
          <div className="grid gap-6 grid-cols-2 items-start">
            <div className="grid gap-2">
              <Label htmlFor="cardName">Nombre de la tarjeta</Label>
              <Input
                id="cardName"
                type="text"
                placeholder="Nombre de la tarjeta"
                required
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="numberStamps">Cantidad de sellos</Label>
              <Input
                id="numberStamps"
                type="number"
                placeholder="0"
                max="30"
                required
                aria-invalid={Boolean(errors.numberStamps)}
                errorMsg={errors.numberStamps?.message}
                {...register("numberStamps", { valueAsNumber: true })}
              />
            </div>
          </div>

          <Button type="submit">Crear</Button>
        </div>
      </form>
    </div>
  );
}

export { CardForm };
