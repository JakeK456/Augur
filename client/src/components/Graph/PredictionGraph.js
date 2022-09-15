//import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";
import { PredictionGraphBounds } from "../../util/graph";
import GraphBase from "./GraphBase";

export default function PredictionGraph({ graphData, setGraphData }) {
  Chart.register(zoomPlugin);
  const graphBounds = new PredictionGraphBounds(graphData.datasets[0].data);

  const getParentOptions = (chartRef) => ({
    scales: {
      x: {
        min: chartRef.current
          ? chartRef.current.scales.x.min
          : graphBounds.xMin,
        max: chartRef.current
          ? chartRef.current.scales.x.max
          : graphBounds.xMax + graphBounds.xPadding,
      },
      y: {
        min: chartRef.current
          ? chartRef.current.scales.y.min
          : graphBounds.yMin - graphBounds.yPadding,
        max: chartRef.current
          ? chartRef.current.scales.y.max
          : graphBounds.yMax + graphBounds.yPadding,
      },
    },
    plugins: {
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
  });

  return (
    <GraphBase graphData={graphData} getParentOptions={getParentOptions} />
  );
}

const validateClick = (x) => {
  return x > moment().format("x");
};

const appendToPredictionArray = (array, dataPoint) => {
  if (dataPoint.x > array[array.length - 1].x) {
    array.push(dataPoint);
  }
};
