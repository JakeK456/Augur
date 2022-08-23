import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerLine =
    "w-8 h-1 rounded-full bg-black transition ease transform duration-300";

  console.log(isLoggedIn);

  return (
    <div>
      <nav className="flex min-h-20 items-center border-b-4 border-black ">
        <div className="basis-1/4 flex justify-start pl-6 group">
          <div
            className="cursor-pointer space-y-2"
            onClick={() => {
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
          isOpen ? "visible" : "invisible"
        } absolute z-10 w-screen bg-white rounded-b-lg `}
      >
        <ul className="text-lg text-gray-700">
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/Login"
                className="flex block py-2 px-4 h-12 hover:bg-gray-100 border-b-4 border-black justify-center items-center"
              >
                Login
              </NavLink>
              <NavLink
                to="/SignUp"
                className="flex block py-2 px-4 h-12 hover:bg-gray-100 border-b-4 border-black justify-center items-center"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/Predict"
                className="flex block py-2 px-4 h-12 hover:bg-gray-100 border-b-4 border-black justify-center items-center"
              >
                Predict
              </NavLink>
              <NavLink
                to="/Portfolio"
                className="flex block py-2 px-4 h-12 hover:bg-gray-100 border-b-4 border-black justify-center items-center"
              >
                Portfolio
              </NavLink>
            </>
          )}

          <NavLink
            to="/Charts"
            className="flex block py-2 px-4 h-12 hover:bg-gray-100 border-b-4 border-black justify-center items-center"
          >
            Charts
          </NavLink>
          <NavLink
            to="/News"
            className="flex block py-2 px-4 h-12 hover:bg-gray-100 border-b-4 border-black justify-center items-center rounded-b-lg"
          >
            News
          </NavLink>
        </ul>
      </div>

      {/* <NavLink to="/" className="navbar-link">
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/protected" className="navbar-link">
            User
          </NavLink>
          <button className="navbar-link" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className="navbar-link">
            Login
          </NavLink>
          <NavLink to="/signup" className="navbar-link">
            Signup
          </NavLink>
        </>
      )} */}
    </div>
  );
}
