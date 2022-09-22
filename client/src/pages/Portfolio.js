import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { NUM_PREDICTIONS } from "../util/queries";
import { useAuth } from "../util/auth";
import { useNavigate } from "react-router-dom";
import PortfolioDisplay from "../components/PortfolioDisplay";
import Modal from "../components/Modal";

export default function Portfolio() {
  const { isLoggedIn } = useAuth();
  const [showNeedsAuthModal, setShowNeedsAuthModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn ? setShowNeedsAuthModal(false) : setShowNeedsAuthModal(true);
  }, [showNeedsAuthModal]);

  const navigateToLoginPage = useCallback(
    () => navigate("/login", { replace: true }),
    [navigate]
  );

  return (
    <div className="pt-10 px-5">
      {showNeedsAuthModal ? (
        <Modal
          setShowModal={setShowNeedsAuthModal}
          header={"Please Log In"}
          body={"You must be logged in to view your portfolio!"}
          confirmButton={{ text: "Login", action: navigateToLoginPage }}
          backButton={{ text: "Back", action: navigateToLoginPage }}
        />
      ) : (
        <PortfolioDisplay />
      )}
    </div>
  );
}
