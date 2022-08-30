import { ReactChart, Line, getDatasetAtEvent } from "react-chartjs-2";
import { Chart } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";

Chart.register(zoomPlugin);

const validateClick = (x) => {
  return x > moment().format("x");
};

export default function Graph({ graphData }) {
  const [data, setData] = useState(graphData);
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
    },
    onClick: (event) => {
      const click = {
        x: Math.round(chartRef.current.scales.x.getValueForPixel(event.x)),
        y:
          Math.round(
            chartRef.current.scales.y.getValueForPixel(event.y) * 100
          ) / 100,
      };

      var gradient = chartRef.current.ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(250,174,50,1)");
      gradient.addColorStop(1, "rgba(250,174,50,0)");

      const validClick = validateClick(click.x);

      if (validClick) {
        setData((prevData) => {
          const newData = cloneDeep(prevData);
          appendToPredictionArray(newData.datasets[1].data, click);
          return newData;
        });
      }
      console.log(data);
    },
  };

  return <Line ref={chartRef} data={data} options={options} />;
}

const appendToPredictionArray = (array, dataPoint) => {
  let midpoints = [];
  for (let index = 0; index < array.length - 1; index++) {
    midpoints.push(Math.ceil((array[index].x + array[index + 1].x) / 2));
  }

  if (dataPoint.x > array[array.length - 1].x) {
    array.push(dataPoint);
  }
};

//borderColor: "#EA4335", // red
//borderColor: "#34A853", // green

// const canvasPosition = Chart.helpers.getRelativePosition(e, chart);
//       const clickX = Math.round(
//         chart.scales.x.getValueForPixel(canvasPosition.x)
//       );
//       const clickY =
//         Math.round(
//           chart.scales.y.getValueForPixel(canvasPosition.y) * 100
//         ) / 100;

//       const validClick = validateClick(clickX);
//       const predDate = moment(clickX, "x").format("MMM D");

//       if (validClick) {
//         predictionPreview.innerHTML = `
//         <h5 id="prediction-header">Prediction</h5>
//         <h6>${ticker}:  $${clickY} on ${predDate}</h6>
//         <button type="button" class="btn btn-primary" id="predict-btn">Predict</button>`;
//         document
//           .getElementById("predict-btn")
//           .addEventListener("click", async () => {
//             try {
//               const predictionData = {
//                 ticker,
//                 start_price: currentPrice.textContent,
//                 start_time: moment().format("x"),
//                 predicted_price: clickY,
//                 predicted_time: clickX,
//               };
//               const response = await fetch("/api/prediction", {
//                 method: "POST",
//                 body: JSON.stringify(predictionData),
//                 headers: {
//                   "Content-Type": "application/json; charset=UTF-8",
//                 },
//               });
//             } catch (err) {
//               console.log(err);
//             }
//             location.replace("/portfolio");
//           });
//       }
