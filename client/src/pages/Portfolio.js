import { useQuery } from "@apollo/client";
import { NUM_PREDICTIONS } from "../util/queries";
import PortfolioDisplay from "../components/PortfolioDisplay";

export default function Portfolio() {
  const numPredictionsQuery = useQuery(NUM_PREDICTIONS, {
    // skip cache for demonstration
    fetchPolicy: "network-only",
  });

  let numPredictions;
  if (!numPredictionsQuery.loading) {
    numPredictions = numPredictionsQuery.data.numPredictions.numPredictions;
  }

  return (
    <div>
      {numPredictions ? (
        <>
          <p className="text-center">{`You've made ${numPredictions} predictions!`}</p>
          <PortfolioDisplay />
        </>
      ) : null}
    </div>
  );
}
