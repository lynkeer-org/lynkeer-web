export type PassFieldConfig = {
  key: string;
  label: string;
  field_type: "primary_field" | "secondary_field" | "back_field";
};

export type PassField = {
  key: PassFieldConfig["key"];
  label: PassFieldConfig["label"];
  value: string;
  field_type: PassFieldConfig["field_type"];
};

export type GenericForm = {
  [key: string]: string;
};
