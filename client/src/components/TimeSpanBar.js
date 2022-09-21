export default function TimeSpanBar({ timeSpan, setTimeSpan }) {
  const handleClickEvent = (event) => {
    if (event.target.type === "button") {
      setTimeSpan(event.target.textContent);

      // event.currentTarget.childNodes.forEach((element) => {
      //   element.firstChild.classList.remove("border-b-2");
      // });

      // event.target.classList.add("border-b-2");
    }
  };

  return (
    <div className="flex" onClick={handleClickEvent}>
      <div className="basis-[14.2857143%] shrink hover:bg-gray-200 px-1 border-r text-center">
        <button
          className={`${timeSpan === "1D" && "border-b-2"} w-8 text-sm`}
          type="button"
        >
          1D
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-gray-200 px-1 border-r text-center">
        <button
          className={`${timeSpan === "5D" && "border-b-2"} w-8 text-sm`}
          type="button"
        >
          5D
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-gray-200 px-1 border-r text-center">
        <button
          className={`${timeSpan === "1M" && "border-b-2"} w-8 text-sm`}
          type="button"
        >
          1M
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-gray-200 px-1 border-r text-center">
        <button
          className={`${timeSpan === "6M" && "border-b-2"} w-8 text-sm`}
          type="button"
        >
          6M
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-gray-200 px-1 border-r text-center">
        <button
          className={`${timeSpan === "1Y" && "border-b-2"} w-8 text-sm`}
          type="button"
        >
          1Y
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-gray-200 px-1 border-r text-center">
        <button
          className={`${timeSpan === "5Y" && "border-b-2"} w-8 text-sm`}
          type="button"
        >
          5Y
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-gray-200 px-1 text-center">
        <button
          className={`${timeSpan === "Max" && "border-b-2"} w-8 text-sm`}
          type="button"
        >
          Max
        </button>
      </div>
    </div>
  );
}
