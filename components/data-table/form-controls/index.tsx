import CheckboxForm from "./checkbox-form";
import DateForm from "./date-form";
import RangeForm from "./range-form";
import TextForm from "./text-form";

export const FormControlsMap = {
  text: TextForm,
  range: RangeForm,
  date: DateForm,
  checkbox: CheckboxForm,
  radio: () => <p>Radio filter form</p>,
  select: () => <p>Select filter form</p>,
} as const;
