import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../util/auth";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export default function SignUp() {
  const { isLoggedIn, signup, loading, error } = useAuth();
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (error) {
      // TODO: replace window alert with custom alert.
      alert(error);
    }
  }, [error]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    signup(formState);
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="w-full max-w-lg m-auto">
      <form className="bg-white px-4 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="flex mb-4 mt-16">
          <input
            className="grow shadow appearance-none border rounded py-2 px-3 mr-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formState.firstName.value}
            onChange={handleInputChange}
          />
          <input
            className="grow shadow appearance-none border rounded py-2 px-3 ml-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formState.lastName.value}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={formState.email.value}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formState.password.value}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
            value={formState.passwordConfirm.value}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <div className="w-full px-6 my-2">
            <button
              className="bg-green-500 hover:bg-green-700 w-full text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <p>
            Already have an account?
            <a
              className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 ml-1 my-2"
              href="/Login"
            >
              Log In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
