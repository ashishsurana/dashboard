import { useMemo } from "react";
import {
  data as allData,
  type Category,
  type IData,
  type Status,
} from "../data";
import type { FilterState } from "../Components/Filter";

const displayStatus: Record<Status, string> = {
  NEW: "New",
  BLOCKED: "Blocked",
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
};

const getStatusChartData = (distribution: Record<Status, number>) => {
  const keys = Object.keys(distribution) as Status[];
  return {
    labels: keys.map((k) => displayStatus[k]),
    datasets: [
      {
        label: "Status",
        data: keys.map((k) => distribution[k]),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 105, 16)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
};

const getCategoryChartData = (distribution: Record<Category, number>) => {
  const keys = Object.keys(distribution) as Category[];
  return {
    labels: keys,
    datasets: [
      {
        label: "Category",
        data: keys.map((k) => distribution[k]),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 105, 16)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
};

const getItemsPerDay = (distribution: Record<string, number>) => {
  const keys = Object.keys(distribution) as Category[];
  return {
    datasets: [
      {
        label: "Items",
        data: keys.map((timestamp) => {
          return {
            x: timestamp,
            y: distribution[timestamp],
          };
        }),
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };
};

const useDashboardData = (filters: FilterState) => {
  const statusDistribution: Record<Status, number> = {
    NEW: 0,
    BLOCKED: 0,
    COMPLETED: 0,
    IN_PROGRESS: 0,
  };
  const categoryDistribution: Record<Category, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  };
  const itemsPerDay: Record<string, number> = {};

  allData.forEach((data: IData) => {
    statusDistribution[data.status] += 1;
    categoryDistribution[data.category] += 1;
    const date = new Date(+data.date);
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    itemsPerDay[formattedDate] = (itemsPerDay[formattedDate] || 0) + 1;
  });

  const filteredData = useMemo(() => {
    if (Object.values(filters).filter(Boolean).length > 0) {
      return allData.filter((d) => {
        const isMatchedStatus = displayStatus[d.status] === filters.Status;
        const isMatchedCategory = d.category === filters.Category;
        return (
          (filters.Status ? isMatchedStatus : true) &&
          (filters.Category ? isMatchedCategory : true)
        );
      });
    } else {
      return allData;
    }
  }, [filters]);

  return {
    statusData: getStatusChartData(statusDistribution),
    categoryData: getCategoryChartData(categoryDistribution),
    itemsPerDay: getItemsPerDay(itemsPerDay),
    tableData: filteredData,
    rawData: allData,
  };
};

export default useDashboardData;
