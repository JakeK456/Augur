import { NavLink } from "react-router-dom";

export default function HamburgerMenu({ hamburgerOpen, setHamburgerOpen }) {
  return (
    <div
      className={`${
        hamburgerOpen ? "visible opacity-100" : "invisible opacity-0"
      } absolute z-10 w-screen bg-white rounded-b-lg transition-opacity duration-500 ease-out`}
      onClick={(event) => {
        event.stopPropagation();
        setHamburgerOpen(false);
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
  );
}
