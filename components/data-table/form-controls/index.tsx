import TextForm from "./text-form";

export const FormControlsMap = {
  text: TextForm,
  range: () => <p>Range filter form</p>,
  checkbox: () => <p>Checkbox filter form</p>,
  date: () => <p>Date filter form</p>,
  radio: () => <p>Radio filter form</p>,
  select: () => <p>Select filter form</p>,
} as const;
