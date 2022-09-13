import { ReactChart, Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import { useEffect, useRef } from "react";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";

export default function DisplayGraph({ graphData }) {
  const chartRef = useRef();

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          displayFormats: {
            day: "MMM D",
          },
        },
        ticks: {
          color: "#D3D3D3",
        },
      },
      y: {
        ticks: {
          color: "#D3D3D3",
        },
      },
    },
    animation: {
      duration: 0,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Line ref={chartRef} data={graphData.displayGraph} options={options} />
  );
}
