import {
  columnFilteringFeature,
  columnPinningFeature,
  filterFn_includesString,
  metaHelper,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/react-table";
import type { TFilterVariant } from "./types";

interface DataTableColumnMeta {
  filterVariant?: TFilterVariant;
}

export const features = tableFeatures({
  rowPaginationFeature,
  rowSelectionFeature,
  columnFilteringFeature,
  rowSortingFeature,
  columnPinningFeature,
  filterFns: {
    includesString: filterFn_includesString,
  },
  columnMeta: metaHelper<DataTableColumnMeta>(),
});

export type TFeatures = typeof features;
