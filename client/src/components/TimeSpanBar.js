export default function TimeSpanBar({ setTimeSpan }) {
  const handleClickEvent = (event) => {
    if (event.target.type === "button") {
      setTimeSpan(event.target.textContent);
    }
  };

  return (
    <div className="flex" onClick={handleClickEvent}>
      <button
        className="basis-[14.2857143%] shrink hover:bg-gray-200 text-sm px-1 border-r"
        type="button"
      >
        1D
      </button>
      <button
        className="basis-[14.2857143%] shrink hover:bg-gray-200 text-sm px-1 border-r"
        type="button"
      >
        5D
      </button>
      <button
        className="basis-[14.2857143%] shrink hover:bg-gray-200 text-sm px-1 border-r"
        type="button"
      >
        1M
      </button>
      <button
        className="basis-[14.2857143%] shrink hover:bg-gray-200 text-sm px-1 border-r"
        type="button"
      >
        6M
      </button>
      <button
        className="basis-[14.2857143%] shrink hover:bg-gray-200 text-sm px-1 border-r"
        type="button"
      >
        1Y
      </button>
      <button
        className="basis-[14.2857143%] shrink hover:bg-gray-200 text-sm px-1 border-r"
        type="button"
      >
        5Y
      </button>
      <button
        className="basis-[14.2857143%] shrink hover:bg-gray-200 text-sm px-1"
        type="button"
      >
        Max
      </button>
    </div>
  );
}
