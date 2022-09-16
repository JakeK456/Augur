import { useAuth } from "../util/auth";
import { Navigate } from "react-router-dom";
import AccountContainer from "../components/Account/AccountContainer";

export default function Account() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div>
      {isLoggedIn ? <AccountContainer /> : <Navigate to="/login" replace />}
    </div>
  );
}
