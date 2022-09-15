import { PortfolioGraphBounds } from "../../util/graph";
import GraphBase from "./GraphBase";

export default function PortfolioGraph({ graphData }) {
  const graphBounds = new PortfolioGraphBounds(
    graphData.datasets[0].data,
    graphData.datasets[1].data
  );

  const getParentOptions = (chartRef) => ({
    scales: {
      x: {
        min: graphBounds.xMin - graphBounds.xPadding,
        max: graphBounds.xMax + graphBounds.xPadding,
      },
      y: {
        min: graphBounds.yMin - graphBounds.yPadding,
        max: graphBounds.yMax + graphBounds.yPadding,
      },
    },
  });

  return (
    <GraphBase graphData={graphData} getParentOptions={getParentOptions} />
  );
}
