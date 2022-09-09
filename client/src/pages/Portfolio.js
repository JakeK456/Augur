import { useQuery } from "@apollo/client";
import { NUM_PREDICTIONS } from "../util/queries";

export default function Portfolio() {
  const { data, loading } = useQuery(NUM_PREDICTIONS, {
    // skip cache for demonstration
    fetchPolicy: "network-only",
  });

  console.log(data);

  return <div></div>;
}
