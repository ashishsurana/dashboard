import type { ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Header from "../../Header";
import { useContext } from "react";
import { FilterContext } from "../../Filter";

const DoughnutChart = ({ data, title }: { data: ChartData; title: string }) => {
  const { setFilters } = useContext(FilterContext);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    layout: {
      padding: {
        top: 24,
        right: 24,
        bottom: 24,
        left: 24,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          boxWidth: 16,
          boxHeight: 16,
          padding: 16,
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const chart = elements[0];
        const index = chart.index;
        const value = data.labels[index] as string;
        const key = data.datasets[0].label || "";
        setFilters(key, value);
      }
    },
  };
  return (
    <div
      className="border border-gray-200 bg-white shadow-xl rounded-xl p-4 flex flex-col gap-2"
      data-testid="doughnut-chart"
    >
      <Header title={title} />
      <div
        style={{
          height: "90%",
        }}
      >
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
