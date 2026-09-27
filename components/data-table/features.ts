import {
  columnFilteringFeature,
  columnPinningFeature,
  filterFn_includesString,
  filterFn_inNumberRange,
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
    inNumberRange: filterFn_inNumberRange,
  },
  columnMeta: metaHelper<DataTableColumnMeta>(),
});

export type TFeatures = typeof features;
