import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function TabletNav() {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerLine =
    "w-8 h-1 rounded-full bg-black transition transform duration-300";

  return (
    <div>
      <nav className="flex min-h-20 items-center border-b-2 border-black ">
        <div className="basis-1/4 flex justify-start pl-6 group">
          <div
            className="cursor-pointer space-y-2"
            onClick={(event) => {
              setIsOpen(!isOpen);
            }}
          >
            <div
              className={`${hamburgerLine} ${
                isOpen
                  ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            ></div>
            <div
              className={`${hamburgerLine} ${
                isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
              }`}
            ></div>
            <div
              className={`${hamburgerLine} ${
                isOpen
                  ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            ></div>
          </div>
        </div>

        <div className="basis-1/2 flex justify-center">
          <a href="/" className="font-marcellus text-4xl font-medium">
            Augur
          </a>
        </div>

        <div className="basis-1/4"></div>
      </nav>

      <div
        className={`${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        } absolute z-10 w-screen bg-white rounded-b-lg transition-opacity duration-500 ease-out`}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(false);
        }}
      >
        <ul className="text-lg text-gray-700 ">
          <>
            <NavLink to="/predict" className="hamburger-dropdown">
              Predict
            </NavLink>
            <NavLink to="/portfolio" className="hamburger-dropdown">
              Portfolio
            </NavLink>
          </>
          <NavLink to="/charts" className="hamburger-dropdown">
            Charts
          </NavLink>
          <NavLink to="/news" className="hamburger-dropdown">
            News
          </NavLink>
          <NavLink to="/account" className="hamburger-dropdown">
            Account
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
