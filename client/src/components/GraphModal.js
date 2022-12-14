import PortfolioGraph from "./Graph/PortfolioGraph";
import { useState } from "react";

export default function GraphModal({ graphModal, setGraphModal }) {
  const handleBackButton = () => {
    setGraphModal({ isShowing: false, data: null });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-screen my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t">
              <button
                className="p-2 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={handleBackButton}
              >
                <span className="h-6 w-6 text-2xl block outline-none focus:outline-none cursor-pointer">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <PortfolioGraph graphData={graphModal.data.displayGraph} />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
