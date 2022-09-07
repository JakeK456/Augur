import { useQuery } from "@apollo/client";
import { ME } from "../util/queries";

export default function Portfolio() {
  const { data, loading } = useQuery(ME, {
    // skip cache for demonstration
    fetchPolicy: "network-only",
  });

  return <div></div>;
}
