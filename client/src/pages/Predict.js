import { useEffect, useState } from "react";
import { FiChevronsRight } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useLazyQuery } from "@apollo/client";
import { TICKER } from "../util/queries";
import Graph from "../components/Graph";

const testData = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: "Test",
      data: [5, 2, 3, 4, 1],
    },
  ],
};

export default function Predict() {
  const [tickerInput, setTickerInput] = useState("");
  const [graphKey, setGraphKey] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [graphData, setGraphData] = useState({});
  const [getTickerData] = useLazyQuery(TICKER);

  const handleInputChange = (evt) => {
    const value = evt.target.value.toUpperCase();
    setTickerInput((prevState) => value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const { loading, error, data } = await getTickerData({
      variables: { ticker: tickerInput },
      fetchPolicy: "network-only",
    });

    setGraphData({
      labels: data.ticker.x,
      datasets: [
        {
          data: data.ticker.y,
          borderColor: "#34A853", // green
        },
      ],
    });

    setGraphKey(Math.random().toString());
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col h-full">
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
          <button
            className="grow-0 shrink-0 basis-8 ml-2 bg-blue-500 hover:bg-blue-700 shadow text-white rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            <IconContext.Provider
              value={{ style: { margin: "auto", width: "70%", height: "70%" } }}
            >
              <div>
                <FiChevronsRight />
              </div>
            </IconContext.Provider>
          </button>
        </div>
      </form>
      {submitted ? (
        <>
          {/* chart */}
          <div className="grow pb-8">
            <h4 className="text-center text-sm">
              Click on the chart to make a prediction
            </h4>
            <div className="w-full h-full">
              <Graph key={graphKey} graphData={graphData} />
            </div>
          </div>
          {/* prediction display */}
          <div className="my-4">
            <h2 className="text-xl">Prediction:</h2>
            <p className=" text-center"> APPL: $165 @ Jun 12, 2022</p>
          </div>
          {/* send / reset buttons */}
          <div className="mx-8">
            <button
              className="bg-green-500 hover:bg-green-700 w-full text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline my-1"
              type="button"
            >
              Send
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 w-full text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline my-1"
              type="button"
            >
              Reset
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
