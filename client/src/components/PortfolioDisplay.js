import { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_CARDS, GET_DISPLAY_GRAPH, NUM_PREDICTIONS } from "../util/queries";
import Card from "./Card";
import GraphModal from "./GraphModal";
import BlueChevronButton from "./Buttons/BlueChevronButton";

import SearchTickerDropDown from "./SearchTickerDropDown";
import SortDropDown from "./SortDropDown";

export default function PortfolioDisplay() {
  const [searchInput, setSearchInput] = useState("*ALL*");
  const [sortInput, setSortInput] = useState("Start Date - Descending");
  const [cards, setCards] = useState([]);
  const [graphModal, setGraphModal] = useState({
    isShowing: false,
    data: null,
  });

  const { data: { numPredictions: { numPredictions } = {} } = {} } = useQuery(
    NUM_PREDICTIONS,
    {
      fetchPolicy: "network-only",
    }
  );

  const [getCardData] = useLazyQuery(GET_CARDS);
  const [getPredictionData] = useLazyQuery(GET_DISPLAY_GRAPH);

  useEffect(() => {
    console.log("useEffect");
    getCards(searchInput, sortInput);
  }, []);

  const handleInputChange = (evt) => {
    const value = evt.target.value.toUpperCase();
    setSearchInput(value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("handleSubmit");
    getCards(searchInput, sortInput);
  };

  const getCards = async (ticker, dateOrder) => {
    console.log("getCards");
    const date = dateOrder.split(" ")[0].toLowerCase();
    const order = dateOrder.split(" ")[3].toLowerCase();
    const { loading, error, data } = await getCardData({
      variables: { ticker, date, order },
      fetchPolicy: "network-only",
    });
    setCards(data.cards);
    console.log(data.cards);
  };

  const handleCardClicked = async (predictionId) => {
    const { loading, error, data } = await getPredictionData({
      variables: { predictionId },
      fetchPolicy: "network-only",
    });

    if (data) {
      setGraphModal({ isShowing: true, data });
    }
  };

  return (
    <div className="bg-primary p-5 shadow-xl">
      <h3 className="text-center text-secondary mb-2">
        {`You've made a total of ${numPredictions} predictions!`}
      </h3>
      <form
        className="flex flex-col md:flex-row"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="basis-1/2 relative border border-secondary rounded p-6 m-4">
          <label className="absolute -top-4 left-4 bg-primary text-secondary text-lg px-2">
            Search
          </label>
          <div className="flex px-2 justify-center">
            <label
              className="text-secondary text-md mr-6"
              htmlFor="tickerInput"
            >
              Ticker:
            </label>
            <SearchTickerDropDown
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
            <BlueChevronButton />
          </div>
        </div>

        <div className="basis-1/2 relative border border-secondary rounded p-6 m-4">
          <label className="absolute -top-4 left-4 bg-primary text-secondary text-lg px-2">
            Sort
          </label>
          <div className="flex justify-center px-2">
            <SortDropDown sortInput={sortInput} setSortInput={setSortInput} />
          </div>
        </div>
      </form>

      {cards.length > 0 ? (
        <div className="mt-6 bg-slate-100">
          <div className="flex flex-row border-b border-black bg-slate-300">
            <h2 className="basis-1/3 text-center font-bold">Ticker</h2>
            <h2 className="basis-1/3 text-center font-bold">Start Date</h2>
            <h2 className="basis-1/3 text-center font-bold">End Date</h2>
          </div>
          {cards.map((card, index) => (
            <Card
              key={index}
              data={card}
              handleCardClicked={handleCardClicked}
            />
          ))}
        </div>
      ) : null}
      {graphModal.isShowing ? (
        <GraphModal graphModal={graphModal} setGraphModal={setGraphModal} />
      ) : null}
    </div>
  );
}
