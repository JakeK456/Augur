import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import merge from "lodash/merge.js";
import { useRef } from "react";

export default function GraphBase({ graphData, getParentOptions }) {
  const chartRef = useRef();
  console.log(graphData);
  const baseOptions = {
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
      },
      y: {
        ticks: {
          color: "#D3D3D3",
          callback: function (val) {
            return Math.floor(val);
          },
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
      title: {
        text: graphData.ticker,
        display: true,
      },
    },
  };

  const parentOptions = getParentOptions(chartRef);
  let options = {};
  merge(options, baseOptions, parentOptions);

  return <Line ref={chartRef} data={graphData} options={options} />;
}
