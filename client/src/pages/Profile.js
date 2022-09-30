import { useQuery } from "@apollo/client";
import { useAuth } from "../util/auth";
import { PROFILE } from "../util/queries";

export default function Profile() {
  const { isLoggedIn, logout } = useAuth();
  const { error, loading, data } = useQuery(PROFILE, {
    variables: { accountId: window.location.pathname },
    fetchPolicy: "network-only",
  });

  return <div>Profile Page</div>;
}
