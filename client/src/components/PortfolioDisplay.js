import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CARDS, GET_DISPLAY_GRAPH } from "../util/queries";
import Card from "./Card";
import GraphModal from "./GraphModal";
import BlueChevronButton from "./Buttons/BlueChevronButton";

export default function PortfolioDisplay() {
  const [searchInput, setSearchInput] = useState("");
  const [cards, setCards] = useState([]);
  const [graphModal, setGraphModal] = useState({
    isShowing: false,
    data: null,
  });
  const [getCardData] = useLazyQuery(GET_CARDS);
  const [getPredictionData] = useLazyQuery(GET_DISPLAY_GRAPH);

  const handleInputChange = (evt) => {
    const value = evt.target.value.toUpperCase();
    setSearchInput(value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    getCards();
  };

  const getCards = async () => {
    const { loading, error, data } = await getCardData({
      variables: { ticker: searchInput },
      fetchPolicy: "network-only",
    });
    setCards(data.cards);
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
      <form className="flex" onSubmit={handleSubmit}>
        <label
          className="flex shrink-0 basis-1/2 inline-block text-secondary text-lg justify-start items-center"
          htmlFor="tickerInput"
        >
          Ticker Search:
        </label>
        <div className="flex basis-1/2">
          <input
            className="grow w-0 h-8 py-2 px-3 uppercase shadow appearance-none border rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
            id="searchInput"
            name="search"
            type="text"
            placeholder="AAPL"
            value={searchInput}
            onChange={handleInputChange}
          />
          <BlueChevronButton />
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
