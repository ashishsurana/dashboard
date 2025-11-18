import "./App.css";

import DoughnutChart from "./Components/Visualisations/Doughnut";
import useDashboardData from "./Hooks/useDashboardData";
import BarChart from "./Components/Visualisations/Bar";
import "./chart-setup";
import Filter, { FilterContext, type FilterState } from "./Components/Filter";
import { useState } from "react";
import Table from "./Components/Visualisations/Table";

const storeFilters = (filters: FilterState) =>
  localStorage.setItem("data-filters", JSON.stringify(filters));
const getFilters = () =>
  JSON.parse(localStorage.getItem("data-filters") || "{}");

function App() {
  const initialFilters = getFilters();
  const [filters, setFilters] = useState(initialFilters);
  const { statusData, categoryData, tableData, itemsPerDay } =
    useDashboardData(filters);

  const setResetFilter = (key: string, value: string) => {
    let filterVal = value;
    if (filters[key] === value) {
      filterVal = "";
    }

    storeFilters({ ...filters, [key]: filterVal });
    setFilters({ ...filters, [key]: filterVal });
  };

  const resetFilter = () => {
    setFilters([]);
  };

  return (
    <div className="pt-4" data-testid="dashboard-container">
      <FilterContext.Provider
        value={{ filters, setFilters: setResetFilter, resetFilter }}
      >
        <Filter />
        <div
          style={{
            height: "50vh",
          }}
          className="flex gap-4 px-4 *:flex-1"
        >
          <DoughnutChart data={statusData} title="Status Distribution" />
          <DoughnutChart data={categoryData} title="Category Distribution" />
          <BarChart data={itemsPerDay} title="Items by Day" />
        </div>
        <div className="p-4">
          <Table data={tableData} />
        </div>
      </FilterContext.Provider>
    </div>
  );
}

export default App;
