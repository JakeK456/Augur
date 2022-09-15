import { ReactChart, Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";
import { useEffect, useRef } from "react";
import moment from "moment";
import { GraphBounds } from "../util/graph";

export default function GraphBase({ graphData, setGraphData }) {
  const chartRef = useRef();
  const graphBounds = new GraphBounds(graphData.datasets[0].data);
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
          : graphBounds.xMin,
        max: chartRef.current
          ? chartRef.current.scales.x.max
          : graphBounds.xMax + graphBounds.xPadding,
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
          : graphBounds.yMin - graphBounds.yPadding,
        max: chartRef.current
          ? chartRef.current.scales.y.max
          : graphBounds.yMax + graphBounds.yPadding,
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
