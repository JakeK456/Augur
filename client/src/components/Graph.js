import { ReactChart, Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import { useEffect, useState } from "react";

Chart.register(zoomPlugin);

export default function Graph({ graphData }) {
  const [data, setData] = useState(graphData);
  console.log(data);
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
    onClick: (e) => {
      setData((prevData) => ({
        ...prevData,
        datasets: [
          prevData.datasets[0],
          {
            label: "Test2",
            data: [5, 2, 3, 4, 1],
          },
        ],
      }));
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

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
