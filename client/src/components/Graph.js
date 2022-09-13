import { ReactChart, Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import { useEffect, useRef } from "react";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";

Chart.register(zoomPlugin);

const validateClick = (x) => {
  return x > moment().format("x");
};

export default function Graph({ graphData, setGraphData }) {
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
          : addOneThirdToXAxis(graphData.datasets[0].data),
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
          : graphData.datasets[0].data.hasMin("y").y,
        max: chartRef.current
          ? chartRef.current.scales.y.max
          : graphData.datasets[0].data.hasMax("y").y,
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
      zoom: {
        pan: {
          enabled: true,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    onClick: (event) => {
      const click = {
        x: Math.round(chartRef.current.scales.x.getValueForPixel(event.x)),
        y:
          Math.round(
            chartRef.current.scales.y.getValueForPixel(event.y) * 100
          ) / 100,
      };

      const validClick = validateClick(click.x);

      if (validClick) {
        setGraphData((prevData) => {
          const newData = cloneDeep(prevData);
          appendToPredictionArray(newData.datasets[1].data, click);
          return newData;
        });
      }
    },
  };

  return <Line ref={chartRef} data={graphData} options={options} />;
}

const appendToPredictionArray = (array, dataPoint) => {
  if (dataPoint.x > array[array.length - 1].x) {
    array.push(dataPoint);
  }
};

// eslint-disable-next-line no-extend-native
Array.prototype.hasMin = function (attrib) {
  return (
    (this.length &&
      this.reduce(function (prev, curr) {
        return prev[attrib] < curr[attrib] ? prev : curr;
      })) ||
    null
  );
};

// eslint-disable-next-line no-extend-native
Array.prototype.hasMax = function (attrib) {
  return (
    (this.length &&
      this.reduce(function (prev, curr) {
        return prev[attrib] > curr[attrib] ? prev : curr;
      })) ||
    null
  );
};

const addOneThirdToXAxis = (array) => {
  const diff = array[array.length - 1].x - array[0].x;
  const slice = Math.round(diff / 2);
  const addition = array[array.length - 1].x + slice;
  return addition;
};
