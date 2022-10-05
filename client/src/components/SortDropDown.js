import { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ALL_TICKERS_FOR_USER } from "../util/queries";
import useOutsideClick from "./Hooks/useOutsideClick";

export default function SortDropDown({ sortInput, setSortInput }) {
  const ref = useRef();
  const [isExpanded, setIsExpanded] = useState(false);
  //const [input, setInput] = useState("Start Date - Descending");

  useOutsideClick(ref, () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  });

  const handleInputChange = (evt) => {
    const value = evt.target.value.toUpperCase();
    setIsExpanded(true);
    setSortInput(value);
  };

  const handleListItem = (evt) => {
    const value = evt.target.textContent;
    setIsExpanded(false);
    setSortInput(value);
  };

  return (
    <div ref={ref} className="flex border rounded relative w-60">
      <input
        className="border-none outline-none text-right pr-2 w-full"
        id="searchInput"
        name="search"
        type="text"
        value={sortInput}
        onChange={handleInputChange}
      />
      <button
        className="bg-white h-full border-l"
        type="button"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <RiArrowDropDownLine />
      </button>
      {isExpanded && (
        <ul className="absolute top-8 right-0 py-1 border rounded bg-white shadow-xl max-h-40 overflow-y-auto">
          <li
            className="hover:bg-blue-500 hover:text-white cursor-pointer py-1 pl-2 pr-8"
            onClick={handleListItem}
            // key={"Start Date - Ascending"}
          >
            Start Date - Ascending
          </li>
          <li
            className="hover:bg-blue-500 hover:text-white cursor-pointer py-1 pl-2 pr-8"
            onClick={handleListItem}
            // key={"Start Date - Descending"}
          >
            Start Date - Descending
          </li>
          <li
            className="hover:bg-blue-500 hover:text-white cursor-pointer py-1 pl-2 pr-8"
            onClick={handleListItem}
            // key={"End Date - Ascending"}
          >
            End Date - Ascending
          </li>
          <li
            className="hover:bg-blue-500 hover:text-white cursor-pointer py-1 pl-2 pr-8"
            onClick={handleListItem}
            // key={"End Date - Descending"}
          >
            End Date - Descending
          </li>
        </ul>
      )}
    </div>
  );
}
