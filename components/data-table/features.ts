import {
  columnFilteringFeature,
  columnPinningFeature,
  filterFn_includesString,
  filterFn_inNumberRange,
  filterFn_weakEquals,
  metaHelper,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/react-table";
import type { DataTableColumnMeta } from "./types";

export const features = tableFeatures({
  rowPaginationFeature,
  rowSelectionFeature,
  columnFilteringFeature,
  rowSortingFeature,
  columnPinningFeature,
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
    weakEquals: filterFn_weakEquals,
  },
  columnMeta: metaHelper<DataTableColumnMeta>(),
});

export type TFeatures = typeof features;
