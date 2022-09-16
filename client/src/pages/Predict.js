import { useEffect, useState, useRef, useCallback } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { TICKER } from "../util/queries";
import { MAKE_PREDICTION } from "../util/mutations";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../util/auth";
import PredictionGraph from "../components/Graph/PredictionGraph";
import Modal from "../components/Modal";
import TimeSpanBar from "../components/TimeSpanBar";
import BlueChevronButton from "../components/Buttons/BlueChevronButton";

export default function Predict() {
  const { isLoggedIn } = useAuth();
  const [getTickerData] = useLazyQuery(TICKER);
  const [makePrediction] = useMutation(MAKE_PREDICTION);
  const [tickerInput, setTickerInput] = useState("");
  const [graphData, setGraphData] = useState();
  const [graphKey, setGraphKey] = useState(); // Needed as workaround to refresh graph "options" for axis scaling
  const [timeSpan, setTimeSpan] = useState("6M");
  const isMounted = useRef(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAffirmModal, setShowAffirmModal] = useState(false); // useReducer ??
  const [showNeedsAuthModal, setShowNeedsAuthModal] = useState(false);
  const navigate = useNavigate();

  // needed to rerender graph when timespan bar is clicked.
  useEffect(() => {
    if (isMounted.current) {
      fetchGraphData();
    } else {
      isMounted.current = true;
    }
  }, [timeSpan]);

  const handleInputChange = (evt) => {
    const value = evt.target.value.toUpperCase();
    setTickerInput((prevState) => value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    fetchGraphData();
  };

  const handleSendButton = () => {
    isLoggedIn ? setShowConfirmModal(true) : setShowNeedsAuthModal(true);
  };

  const fetchGraphData = async () => {
    try {
      const { loading, error, data } = await getTickerData({
        variables: { ticker: tickerInput, timeSpan: timeSpan },
        fetchPolicy: "network-only",
      });
      setGraphData(data.ticker);
      setGraphKey(data.ticker.ticker.concat(timeSpan));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePredictionSubmit = async () => {
    setShowAffirmModal(true);
    try {
      const ticker = graphData.ticker;
      const coordinates = graphData.datasets[1].data;
      await makePrediction({
        variables: { ticker, coordinates, timeSpan },
      });
      setGraphData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToPortfolioPage = useCallback(
    () => navigate("/portfolio", { replace: true }),
    [navigate]
  );

  const navigateToLoginPage = useCallback(
    () => navigate("/login", { replace: true }),
    [navigate]
  );

  return (
    <div className="flex flex-col p-3 max-w-xl m-auto">
      <h1 className="text-center text-xl underline">Make your Prediction</h1>
      {/* input */}
      <form className="flex my-6" onSubmit={handleSubmit}>
        <label
          className="flex shrink-0 basis-1/2 inline-block text-gray-700 text-lg justify-start items-center"
          htmlFor="tickerInput"
        >
          Enter ticker:
        </label>
        <div className="flex basis-1/2">
          <input
            className="grow w-0 h-8 py-2 px-3 uppercase shadow appearance-none border rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
            id="tickerInput"
            name="ticker"
            type="text"
            placeholder="AAPL"
            value={tickerInput}
            onChange={handleInputChange}
          />
          <BlueChevronButton />
        </div>
      </form>
      {graphData ? (
        <>
          <div className="pb-8 mt-6">
            <TimeSpanBar setTimeSpan={setTimeSpan} />

            <div className="w-full pt-4">
              <PredictionGraph
                key={graphKey}
                graphData={graphData}
                setGraphData={setGraphData}
              />
            </div>
          </div>
          {/* send / reset buttons */}
          <div className="mx-8">
            <button
              className="bg-slate-400 hover:bg-gray-400 w-full text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline my-1"
              type="button"
              onClick={fetchGraphData}
            >
              Clear
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 w-full text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline my-1"
              type="button"
              onClick={handleSendButton}
            >
              Send
            </button>
          </div>
        </>
      ) : null}
      {showNeedsAuthModal ? (
        <Modal
          setShowModal={setShowNeedsAuthModal}
          header={"Please Log In"}
          body={"You must be logged in to send predictions!"}
          confirmButton={{ text: "Login", action: navigateToLoginPage }}
          backButton={{ text: "Back" }}
        />
      ) : null}
      {showConfirmModal ? (
        <Modal
          setShowModal={setShowConfirmModal}
          header={"Confimation"}
          body={"Are you sure you want to send this prediction?"}
          confirmButton={{ text: "Confirm", action: handlePredictionSubmit }}
          backButton={{ text: "Back" }}
        />
      ) : null}
      {showAffirmModal ? (
        <Modal
          setShowModal={setShowAffirmModal}
          header={"Success"}
          body={"Prediction sent!"}
          confirmButton={{ text: "Make Another Prediction" }}
          backButton={{
            text: "View Your Predictions",
            action: navigateToPortfolioPage,
          }}
        />
      ) : null}
    </div>
  );
}
