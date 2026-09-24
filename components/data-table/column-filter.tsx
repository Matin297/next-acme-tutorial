import { FunnelIcon } from "@heroicons/react/24/outline";
import { type RowData, Subscribe } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormControlsMap } from "./form-controls";
import type { ColumnFilterProps } from "./types";

export default function ColumnFilter<TData extends RowData>({
  column,
}: ColumnFilterProps<TData>) {
  const FilterForm =
    FormControlsMap[column.columnDef.meta?.filterVariant ?? "text"];

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="secondary" size="icon" className="rounded-full ">
            <Subscribe source={column.table.atoms.columnFilters}>
              {() => (
                <FunnelIcon
                  className={cn({
                    "text-amber-500 dark:text-amber-600":
                      column.getIsFiltered(),
                  })}
                />
              )}
            </Subscribe>
          </Button>
        }
      />
      <PopoverContent>
        {FilterForm && <FilterForm column={column} />}
      </PopoverContent>
    </Popover>
  );
}
