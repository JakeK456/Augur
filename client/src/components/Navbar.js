import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="flex min-h-20 items-center border-b-4 border-black ">
      <div className="basis-1/4 flex justify-start pl-6">
        <div className="space-y-2">
          <div className="w-8 h-0.5 rounded bg-gray-600"></div>
          <div className="w-8 h-0.5 rounded bg-gray-600"></div>
          <div className="w-8 h-0.5 rounded bg-gray-600"></div>
        </div>
      </div>

      <div className="basis-1/2 flex justify-center">
        <a href="/" className="font-marcellus text-4xl font-medium">
          Augur
        </a>
      </div>

      <div className="basis-1/4"></div>

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
    </nav>
  );
}
