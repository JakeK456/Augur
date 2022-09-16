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

  // const numPredictionsQuery = useQuery(NUM_PREDICTIONS, {
  //   fetchPolicy: "network-only",
  // });

  // let numPredictions;
  // if (!numPredictionsQuery.loading) {
  //   numPredictions = numPredictionsQuery.data.numPredictions.numPredictions;
  // }

  return (
    <div>
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

      {/* {numPredictions ? (
        <>
          <p className="text-center">{`You've made a total of ${numPredictions} predictions!`}</p>
          <PortfolioDisplay />
        </>
      ) : null} */}
    </div>
  );
}
