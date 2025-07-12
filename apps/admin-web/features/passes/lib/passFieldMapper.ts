import { loyaltyPassFieldMapper } from "@/features/passes/lib/loyaltyPassFieldMapper";
import { templatePassTypes } from "@/features/passes/lib/templatePassType";
import type { GenericForm, PassField, PassFieldConfig } from "@/features/passes/types/passFieldTypes";

const passFieldMapper: Record<string, PassFieldConfig[]> = {
  [templatePassTypes.loyaltyPassType]: loyaltyPassFieldMapper,
};

export function getPassFields(_data: GenericForm, passType: string): PassField[] {
  const passFieldsConfigs = passFieldMapper[passType];
  if (!passFieldsConfigs) {
    throw new Error(`No se encontraron configuraciones para el tipo de pas: ${passType}`);
  }

  const passFields: PassField[] = passFieldsConfigs.map((config) => ({
    key: config.key,
    label: config.label,
    value: String(0),
    field_type: config.field_type,
  }));

  return passFields;
}
