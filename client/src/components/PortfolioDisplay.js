import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FiChevronsRight } from "react-icons/fi";
import { IconContext } from "react-icons";
import { GET_CARDS } from "../util/queries";
import Card from "./Card";
import GraphModal from "./GraphModal";

export default function PortfolioDisplay() {
  const [searchInput, setSearchInput] = useState("");
  const [cardData, setCardData] = useState();
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [getCardData] = useLazyQuery(GET_CARDS);
  console.log(cardData);
  const handleInputChange = (evt) => {
    const value = evt.target.value.toUpperCase();
    setSearchInput((prevState) => value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(searchInput);
    getCards();
  };

  const getCards = async () => {
    const { loading, error, data } = await getCardData({
      variables: { ticker: searchInput },
      fetchPolicy: "network-only",
    });
    setCardData(data);
  };

  const handleCardClicked = (predictionId) => {
    setShowGraphModal(true);
    console.log("up here", predictionId);
  };

  return (
    <div className="border">
      <form className="flex my-6" onSubmit={handleSubmit}>
        <label
          className="flex shrink-0 basis-1/2 inline-block text-gray-700 text-lg justify-start items-center"
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
          <button
            className="grow-0 shrink-0 basis-8 ml-2 bg-blue-500 hover:bg-blue-700 shadow text-white rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            <IconContext.Provider
              value={{
                style: { margin: "auto", width: "70%", height: "70%" },
              }}
            >
              <div>
                <FiChevronsRight />
              </div>
            </IconContext.Provider>
          </button>
        </div>
      </form>

      {cardData ? (
        <>
          <div className="flex flex-row">
            <h2 className="basis-1/3 text-center font-bold">Ticker</h2>
            <h2 className="basis-1/3 text-center font-bold">Start Date</h2>
            <h2 className="basis-1/3 text-center font-bold">End Date</h2>
          </div>
          {cardData.cards.map((card, index) => (
            <Card
              key={index}
              data={card}
              handleCardClicked={handleCardClicked}
            />
          ))}
        </>
      ) : null}
      {showGraphModal ? (
        <GraphModal
          setShowModal={setShowGraphModal}
          header={"Confimation"}
          body={"Are you sure you want to send this prediction?"}
          confirmButton={{ text: "Confirm" }}
          backButton={{ text: "Back" }}
        />
      ) : null}
    </div>
  );
}
