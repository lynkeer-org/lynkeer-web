import { z } from "zod";

const cardSchema = z.object({
  name: z.string().min(1).max(50),
  numberStamps: z.number({ message: "" }).min(1, "").max(30, "Máximo 30 sellos"),
});
type CardType = z.infer<typeof cardSchema>;

export { cardSchema };
export type { CardType };
