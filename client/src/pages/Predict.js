import { useEffect, useState } from "react";
import { FiChevronsRight } from "react-icons/fi";
import { IconContext } from "react-icons";

const renderDate = (date) =>
  `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

const initialFormState = {
  ticker: "",
};

export default function Predict() {
  const [formState, setFormState] = useState(initialFormState);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(formState);
    //login(formState);
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-center text-xl underline">Make your Prediction</h1>
      {/* input */}
      <div className="flex my-6">
        <label
          className="flex shrink-0 basis-1/2 inline-block text-gray-700 text-lg justify-start items-center"
          htmlFor="tickerInput"
        >
          Enter ticker:
        </label>
        <div className="flex basis-1/2">
          <input
            className="grow w-0 h-8 py-2 px-3 shadow appearance-none border rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
            id="tickerInput"
            name="ticker"
            type="text"
            placeholder="AAPL"
            value={formState.ticker.value}
            onChange={handleInputChange}
          />
          <button
            className="grow-0 shrink-0 basis-8 ml-2 bg-blue-500 hover:bg-blue-700 shadow text-white rounded focus:outline-none focus:shadow-outline"
            type="reset"
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
      </div>
      {/* chart */}
      <div className="grow pb-8">
        <h4 className="text-center text-sm">
          Click on the chart to make a prediction
        </h4>
        <div className="w-full h-full border"></div>
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
          type="submit"
        >
          Send
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 w-full text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline my-1"
          type="reset"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
