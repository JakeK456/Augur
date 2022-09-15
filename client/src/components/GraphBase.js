import { ReactChart, Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";
import { useEffect, useRef } from "react";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";
import { addXPadding, addYPadding } from "../util/graph";

export default function GraphBase({ graphData, setGraphData }) {
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
          maxTicksLimit: 7,
        },
        min: chartRef.current
          ? chartRef.current.scales.x.min
          : graphData.datasets[0].data[0].x,
        max: chartRef.current
          ? chartRef.current.scales.x.max
          : addXPadding(graphData.datasets[0].data),
      },
      y: {
        ticks: {
          color: "#D3D3D3",
          callback: function (val) {
            return Math.floor(val);
          },
        },
        min: chartRef.current
          ? chartRef.current.scales.y.min
          : graphData.datasets[0].data.hasMin("y").y -
            addYPadding(graphData.datasets[0].data),
        max: chartRef.current
          ? chartRef.current.scales.y.max
          : graphData.datasets[0].data.hasMax("y").y +
            addYPadding(graphData.datasets[0].data),
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

  return <Line ref={chartRef} data={graphData} options={options} />;
}
