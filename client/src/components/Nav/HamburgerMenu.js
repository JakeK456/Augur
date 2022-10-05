import { NavLink } from "react-router-dom";

export default function HamburgerMenu({ hamburgerOpen, setHamburgerOpen }) {
  return (
    <div
      className={`${
        hamburgerOpen ? "visible opacity-100" : "invisible opacity-0"
      } absolute z-10 w-screen bg-primary transition-opacity duration-500 ease-out`}
      onClick={(event) => {
        event.stopPropagation();
        setHamburgerOpen(false);
      }}
    >
      <ul className="text-lg text-secondary">
        <>
          <NavLink
            to="/predict"
            className="hamburger-dropdown text-maven bg-primary"
          >
            Predict
          </NavLink>
          <NavLink
            to="/portfolio"
            className="hamburger-dropdown font-maven bg-primary"
          >
            Portfolio
          </NavLink>
        </>
        <NavLink
          to="/news"
          className="hamburger-dropdown font-maven bg-primary"
        >
          News
        </NavLink>
        <NavLink
          to="/account"
          className="hamburger-dropdown font-maven bg-primary"
        >
          Account
        </NavLink>
      </ul>
    </div>
  );
}
