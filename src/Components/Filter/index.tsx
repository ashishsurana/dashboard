import { createContext, useContext } from "react";
import useDashboardData from "../../Hooks/useDashboardData";

export interface FilterState {
  [key: string]: string;
}

export const FilterContext = createContext({
  filters: {},
} as { filters: FilterState; setFilters?: (key: string, value: string) => void; resetFilter?: () => void });

const Filter = () => {
  const { filters, resetFilter } = useContext(FilterContext);
  const { tableData, rawData } = useDashboardData(filters);

  const totalFilters = Object.values(filters).filter(Boolean).length;
  const hasFilter = totalFilters > 0;
  const displayFilter = Object.keys(filters)
    .filter((key) => filters[key])
    .map((k) => k + ": " + filters[k])
    .join(", ");

  if (!hasFilter) {
    return null;
  }

  return (
    <div
      className=" px-4 pb-3 flex justify-between content-center"
      data-testid="dashboard-filter"
    >
      <div className="font-semibold">
        Filter applied ({totalFilters}):{" "}
        <span className="font-normal">{displayFilter}</span>
      </div>
      <div
        onClick={() => {
          if (resetFilter) {
            resetFilter();
          }
        }}
      >
        Showing {tableData.length} of {rawData.length} items{" "}
        <span className="font-semibold cursor-pointer">Clear All</span>
      </div>
    </div>
  );
};

export default Filter;
