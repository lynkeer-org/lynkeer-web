import type { PassFieldConfig } from "@/features/passes/types/passFieldTypes";

export const loyaltyPassFieldMapper: PassFieldConfig[] = [
  {
    key: "stampsGoal",
    label: "Sellos",
    field_type: "secondary_field",
  },
  {
    key: "rewards",
    label: "Premios disponibles",
    field_type: "secondary_field",
  },
];
