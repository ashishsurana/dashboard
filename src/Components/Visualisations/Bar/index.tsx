import type { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import Header from "../../Header";

const options = {
  responsive: true,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "PP",
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

const LineChart = ({ title, data }: { data: ChartData; title: string }) => {
  return (
    <div
      className="border border-gray-200 bg-white h-fit shadow-xl rounded-xl p-4 flex flex-col gap-2"
      data-testid="bar-chart"
    >
      <Header title={title} />
      <div
        style={{
          height: "60%",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
