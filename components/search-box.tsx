import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const searchFilterFormSchema = z.object({
  value: z.string().min(1, { message: "Search query is required." }),
});

export type TSearchFilter = z.infer<typeof searchFilterFormSchema>;

interface SearchBoxProps {
  initialValue?: string;
  handleSubmit: (value: string) => void;
  handleClear: () => void;
}

export default function SearchBox({
  initialValue,
  handleSubmit,
  handleClear,
}: SearchBoxProps) {
  const form = useForm<TSearchFilter>({
    resolver: zodResolver(searchFilterFormSchema),
    defaultValues: {
      value: initialValue ?? "",
    },
  });

  function onSubmit(data: TSearchFilter) {
    handleSubmit(data.value);
  }

  function onClear() {
    form.reset({ value: "" });
    handleClear();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex gap-1 w-full max-w-100"
    >
      <Controller
        name="value"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <InputGroup className="max-w-xs">
              <InputGroupInput
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Search query..."
                autoComplete="off"
              />
              <InputGroupAddon>
                <MagnifyingGlassIcon className="w-4" />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <section className="flex justify-end gap-2">
        <Button type="submit">Search</Button>
        <Button type="reset" variant="outline" onClick={onClear}>
          Clear
        </Button>
      </section>
    </form>
  );
}
