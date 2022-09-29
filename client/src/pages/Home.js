import { useAuth } from "../util/auth";
import { NavLink } from "react-router-dom";

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      {/* TODO: display logged in user's username */}
      <h1 className="text-center pt-10 font-ubuntu text-[80px] text-primary">
        Augur
      </h1>
      <h3 className="text-center py-4 px-20 font-maven text-[30px] text-black">
        - Your place to make, store, and share stock market predictions.
      </h3>
      <h3 className="text-center py-4 px-20 font-maven text-[20px] text-black">
        What do you think the stock market will do next?
      </h3>
      <h3 className="text-center px-20 font-maven text-[20px] text-black">
        Make a prediction now!
      </h3>
      <div className="flex justify-center m-10">
        <NavLink to="/predict">
          <button className="bg-green-600 rounded-full px-4 py-2 text-white hover:bg-green-500">
            Get Started
          </button>
        </NavLink>
      </div>
    </div>
  );
}
