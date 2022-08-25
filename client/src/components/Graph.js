import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Graph({ graphData }) {
  return (
    <div>
      <Line data={graphData} />
    </div>
  );
}
