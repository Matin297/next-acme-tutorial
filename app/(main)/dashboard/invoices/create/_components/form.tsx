"use client";

import {
  ChevronDownIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { INVOICE_STATUS_OPTIONS } from "@/lib/prisma/utility-types";
import { cn } from "@/lib/utils";
import { createInvoice } from "../actions";
import type { TCustomers } from "../data";
import { createInvoiceSchema, type TCreateInvoice } from "../types";

export default function CreateInvoiceForm({
  customers,
}: {
  customers: TCustomers;
}) {
  const router = useRouter();
  const form = useForm<TCreateInvoice>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      customerId: "",
      amount: 0,
      date: new Date(),
      status: "pending",
    },
  });

  function onCancel() {
    form.reset();
    router.push("/dashboard/invoices");
  }

  async function onSubmit(data: TCreateInvoice) {
    const { success, error, errors } = await createInvoice(data);

    if (success) {
      toast.success("Invoice created successfully");
      form.reset();
      router.push("/dashboard/invoices");
      return;
    }

    if (error) {
      toast.error(error);
    }

    if (errors) {
      for (const [field, [message]] of Object.entries(errors)) {
        form.setError(field as keyof TCreateInvoice, {
          type: "server",
          message,
        });
      }
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl mx-auto">
      <FieldSet>
        <FieldGroup>
          <FieldLegend>Create Invoice</FieldLegend>
          <Controller
            name="customerId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="invoice-customer-id">Customer</FieldLabel>
                <Select
                  disabled={isSubmitting}
                  items={customers}
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="invoice-customer-id"
                    aria-invalid={fieldState.invalid}
                  >
                    <UserCircleIcon className="w-4" />
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.value} value={customer.value}>
                        {customer.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="amount"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="invoice-amount">Amount</FieldLabel>
                <InputGroup>
                  <InputGroupAddon
                    className={cn({ "opacity-50": isSubmitting })}
                  >
                    <CurrencyDollarIcon className="w-4" />
                  </InputGroupAddon>
                  <NumericFormat
                    customInput={InputGroupInput}
                    name={field.name}
                    value={field.value || ""}
                    onValueChange={({ value }) => {
                      field.onChange(value);
                    }}
                    disabled={isSubmitting}
                    onBlur={field.onBlur}
                    id="invoice-amount"
                    placeholder="100"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    decimalScale={0}
                    thousandSeparator=","
                    allowNegative={false}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>USD</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="invoice-date">Date</FieldLabel>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        aria-invalid={fieldState.invalid}
                        variant="outline"
                        data-empty={!field.value}
                        disabled={isSubmitting}
                        className="justify-between font-normal disabled:text-muted-foreground data-[empty=true]:text-muted-foreground"
                      >
                        <span>
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </span>
                        <ChevronDownIcon data-icon="inline-end" />
                      </Button>
                    }
                  />
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      defaultMonth={field.value}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldSet
                data-invalid={fieldState.invalid}
                disabled={isSubmitting}
              >
                <FieldLabel>Status</FieldLabel>
                <RadioGroup
                  disabled={isSubmitting}
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                >
                  {INVOICE_STATUS_OPTIONS.map((status) => (
                    <FieldLabel
                      key={status.value}
                      htmlFor={`invoice-status-${status.value}`}
                    >
                      <Field
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                        className={cn({
                          "opacity-50 text-muted-foreground cursor-not-allowed":
                            isSubmitting,
                        })}
                      >
                        <FieldTitle>{status.label}</FieldTitle>
                        <RadioGroupItem
                          value={status.value}
                          id={`invoice-status-${status.value}`}
                          aria-invalid={fieldState.invalid}
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldSet>
            )}
          />
        </FieldGroup>
      </FieldSet>

      <section className="mt-4 flex items-center gap-4 justify-end">
        <Button variant="destructive" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          Create
        </Button>
      </section>
    </form>
  );
}
